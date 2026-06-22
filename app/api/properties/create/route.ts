import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    console.log('--- RECOMPILED CREATE ROUTE ---');
    const data = await req.json();
    const type = data.type || data.propertyCategory || 'Residential';

    if (!data.userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized: User ID is required' }, { status: 401 });
    }

    let tableName = 'properties';
    let mapped: any = {};

    if (type === 'Residential' || type === 'Apartment') {
      tableName = '"Apartment"';
      mapped = {
        userId: parseInt(data.userId),
        city: data.city || 'Chennai',
        locality: data.locality || 'Unknown',
        street: data.fullAddress || data.landmark || '',
        buildingType: data.apartmentType || 'Apartment',
        bhkType: data.bhkType || '1 BHK',
        expectedRent: parseInt(data.price || data.monthlyRent || data.expectedRent || data.rent) || 0,
        images: data.images || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } else if (type === 'Commercial') {
      tableName = '"Commercial"';
      mapped = {
        userId: parseInt(data.userId),
        city: data.city || 'Chennai',
        locality: data.locality || 'Unknown',
        street: data.fullAddress || data.landmark || '',
        propertyType: data.propertyType || 'Commercial',
        buildingType: data.buildingType || data.apartmentType || 'Commercial',
        expectedRent: parseInt(data.price || data.monthlyRent || data.expectedRent || data.rent) || 0,
        images: data.images || [],
        createdAt: new Date().toISOString()
      };
    } else if (type === 'Flatmate') {
      tableName = '"Flatmate"';
      mapped = {
        userId: parseInt(data.userId),
        city: data.city || 'Chennai',
        locality: data.locality || 'Unknown',
        street: data.fullAddress || data.landmark || '',
        propertyType: data.propertyType || 'Flatmate',
        apartmentType: data.apartmentType || 'Apartment',
        apartmentName: data.apartmentName || 'Unknown',
        bhkType: data.bhkType || '1 BHK',
        roomType: data.roomType || 'Shared Room',
        expectedRent: parseInt(data.price || data.monthlyRent || data.expectedRent || data.rent) || 0,
        images: data.images || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } else {
      tableName = 'properties';
      mapped = {
        owner_id: parseInt(data.userId),
        created_at: new Date().toISOString(),
        title: data.title || data.apartmentName || data.pgName || 'Untitled Property',
        location_address: data.fullAddress || data.locality || 'Unknown Location',
        price: parseInt(data.price || data.monthlyRent || data.expectedRent || data.rent) || 0,
        type: type,
        details: JSON.stringify(data)
      };
    }

    const cleanMapped: any = {};
    for (const key in mapped) {
      if (mapped[key] !== undefined && mapped[key] !== null) {
        cleanMapped[key] = mapped[key];
      }
    }

    const keys = Object.keys(cleanMapped);
    const values = Object.values(cleanMapped);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    
    console.log('Inserting into', tableName, 'Keys:', keys);
    console.log('Clean Mapped:', cleanMapped);

    // Explicit double quotes around column names
    const queryStr = `INSERT INTO ${tableName} ("${keys.join('", "')}") VALUES (${placeholders}) RETURNING id;`;
    
    // Ensure schema is updated
    await pool.query('ALTER TABLE properties ADD COLUMN IF NOT EXISTS details JSONB');
    await pool.query('ALTER TABLE properties ADD COLUMN IF NOT EXISTS owner_id INTEGER');
    
    const result = await pool.query(queryStr, values);

    // Create a notification for the user
    const userIdToNotify = String(data.userId);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Notification" (
        id SERIAL PRIMARY KEY,
        "recipientId" VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        body TEXT,
        category VARCHAR(50),
        "isRead" BOOLEAN DEFAULT FALSE,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `).catch(e => console.error('Failed to create Notification table:', e));

    try {
      const propertyName = data.title || data.apartmentName || data.pgName || data.locality || 'your new property';
      const notificationMessage = `Congratulations! Your listing for "${propertyName}" has been successfully published. It is now live and visible to thousands of potential tenants and buyers on RentIt. You can edit your listing details, upload more photos, or manage incoming inquiries directly from your dashboard.`;

      await pool.query(
        'INSERT INTO "Notification" ("recipientId", title, body, category, "isRead", "createdAt") VALUES ($1, $2, $3, $4, FALSE, CURRENT_TIMESTAMP)',
        [userIdToNotify, 'Listing Approved 🎉', notificationMessage, 'Listings']
      );
    } catch (e: any) {
      console.error('Failed to insert property notification:', e);
    }

    console.log(`[Property] Created in ${tableName} (ID: ${result.rows[0].id})`);
    return NextResponse.json({ success: true, propertyId: result.rows[0].id });
  } catch (error: any) {
    console.error("Failed to create property:", error);
    console.error('Property creation failed:', error);
    try {
      require('fs').writeFileSync('d:\\huzzler web App\\error.log', JSON.stringify({ message: "Property creation failed", details: error.message, stack: error.stack }, null, 2));
    } catch(err) {}
    return NextResponse.json({ success: false, error: 'Failed to create property', details: error.message }, { status: 500 });
  }
}
