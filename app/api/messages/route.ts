import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { fetchPropertyById } from '@/lib/backend';
import { newProjects, properties as mockProperties, ownerListedProperties, metroListedProperties } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const conversationId = searchParams.get('conversationId');

  if (!userId) {
    return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
  }

  try {
    if (conversationId) {
      // Fetch specific conversation messages
      const msgsRes = await pool.query(
        'SELECT * FROM "AppMessage" WHERE "conversationId" = $1 ORDER BY "createdAt" ASC',
        [parseInt(conversationId)]
      );
      
      // Also fetch conversation details to verify access and get participant names
      const convRes = await pool.query(
        'SELECT * FROM "AppConversation" WHERE id = $1 AND ("renterId" = $2 OR "ownerId" = $2)',
        [parseInt(conversationId), String(userId)]
      );

      if (convRes.rows.length === 0) {
        return NextResponse.json({ success: false, error: 'Conversation not found or access denied' }, { status: 403 });
      }

      return NextResponse.json({ 
        success: true, 
        conversation: convRes.rows[0],
        messages: msgsRes.rows 
      });

    } else {
      // Fetch all conversations for user
      // We also want the latest message for the sidebar preview
      const convsRes = await pool.query(`
        SELECT 
          c.id, 
          c."propertyId", 
          c."renterId", 
          c."ownerId", 
          c."createdAt",
          (SELECT text FROM "AppMessage" m WHERE m."conversationId" = c.id ORDER BY "createdAt" DESC LIMIT 1) as last_message,
          (SELECT "createdAt" FROM "AppMessage" m WHERE m."conversationId" = c.id ORDER BY "createdAt" DESC LIMIT 1) as last_message_time
        FROM "AppConversation" c
        WHERE c."renterId" = $1 OR c."ownerId" = $1
        ORDER BY last_message_time DESC NULLS LAST
      `, [String(userId)]);

      // Map it out and fetch property details in parallel
      const chatsPromises = convsRes.rows.map(async (row) => {
        const isOwner = row.ownerId === String(userId);
        const otherUserId = isOwner ? row.renterId : row.ownerId;
        
        // Fetch real name from DB
        let name = isOwner ? 'Renter' : 'Property Owner';
        try {
          const userRes = await pool.query('SELECT name FROM "User" WHERE id::text = $1 OR mobile = $1 LIMIT 1', [otherUserId]);
          if (userRes.rows.length > 0 && userRes.rows[0].name) {
            name = userRes.rows[0].name;
          }
        } catch (e) {
          console.error("Failed to fetch user name:", e);
        }

        // Fetch real property data
        let propertyData: any = await fetchPropertyById(row.propertyId);

        if (!propertyData) {
          // Fallback to mock data if not found in real DB
          propertyData = [...newProjects, ...mockProperties, ...ownerListedProperties, ...metroListedProperties].find(p => p.id === String(row.propertyId));
        }
        
        let title = `Property ID: ${row.propertyId}`;
        let location = 'Location not specified';
        let price: any = 0;
        let deposit: any = 0;
        let type = 'Space';

        if (propertyData) {
          title = propertyData.title || propertyData.propertyName || propertyData.apartmentName || propertyData.buildingType || 'Property';
          location = propertyData.locality || propertyData.location || propertyData.city || propertyData.location_address || location;
          price = propertyData.price || propertyData.expectedRent || propertyData.rent || propertyData.priceRange || 0;
          if (typeof price === 'string') {
            price = price.replace('₹', '');
          }
          deposit = propertyData.deposit || propertyData.securityDeposit || (typeof price === 'number' ? price * 5 : 0) || 0;
          type = propertyData.bhkType || propertyData.bhk || propertyData.type || propertyData.propertyType || propertyData.subtitle || 'Space';
        }

        return {
          id: row.id,
          name: name,
          initials: name.substring(0, 2).toUpperCase(),
          type: isOwner ? 'Tenant' : 'Owner',
          time: row.last_message_time ? new Date(row.last_message_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '',
          message: row.last_message || 'No messages yet',
          sub: title,
          avatarClass: isOwner ? 'ps' : 'rk',
          ownerId: row.ownerId,
          renterId: row.renterId,
          propertyId: row.propertyId,
          property: {
            title,
            location,
            price,
            deposit,
            bhk: type
          }
        };
      });

      const chats = await Promise.all(chatsPromises);

      return NextResponse.json({ success: true, chats });
    }
  } catch (error: any) {
    console.error('Fetch messages error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { conversationId, senderId, text } = data;

    if (!conversationId || !senderId || !text) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    const res = await pool.query(
      'INSERT INTO "AppMessage" ("conversationId", "senderId", text, "createdAt") VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
      [parseInt(conversationId), String(senderId), text]
    );

    return NextResponse.json({ success: true, message: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
