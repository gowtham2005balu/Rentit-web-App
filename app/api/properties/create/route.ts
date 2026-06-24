import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const type = data.type || data.propertyCategory || 'Residential';

    if (!data.userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized: User ID is required' }, { status: 401 });
    }

    // Since the database only has the "Property" table, map everything to it
    let tableName = '"Property"';
    let mapped: any = {
      "userId": parseInt(data.userId) || 1,
      "city": data.city || 'Chennai',
      "locality": data.locality || 'Unknown',
      "street": data.fullAddress || data.landmark || '',
      "propertyType": type,
      "propertyName": data.title || data.apartmentName || data.pgName || data.apartmentType || data.buildingType || `${data.bhkType || ''} ${type}`,
      "rent": (function() {
        const val = data.price || data.monthlyRent || data.expectedRent || data.rent;
        if (!val) return 0;
        const parsed = parseFloat(String(val).replace(/,/g, '').replace(/[^0-9.]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
      })(),
      "deposit": parseInt(data.securityDeposit || data.deposit) || 0,
      "availableFrom": data.availableFrom || null,
      "images": data.images || [],
      "createdAt": new Date().toISOString(),
      "updatedAt": new Date().toISOString(),
      "contactName": data.contactName || '',
      "preferredTenant": JSON.stringify(data.preferredTenants || []),
      "propertyDescription": data.propertyDescription || data.description || '',
      "roomType": JSON.stringify(data.bhkType || data.roomType || '')
    };

    const cleanMapped: any = {};
    for (const key in mapped) {
      if (mapped[key] !== undefined && mapped[key] !== null) {
        cleanMapped[key] = mapped[key];
      }
    }

    const keys = Object.keys(cleanMapped);
    const values = Object.values(cleanMapped);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    
    // Explicit double quotes around column names
    const queryStr = `INSERT INTO ${tableName} ("${keys.join('", "')}") VALUES (${placeholders}) RETURNING id;`;
    
    const result = await pool.query(queryStr, values);

    try {
      const propertyName = mapped.propertyName;
      const userIdToNotify = String(data.userId);
      const notificationMessage = `Congratulations! Your listing for "${propertyName}" has been successfully published. It is now live and visible to thousands of potential tenants and buyers on RentIt.`;

      await pool.query(
        'INSERT INTO "Notification" ("recipientId", title, body, category, "isRead", "createdAt") VALUES ($1, $2, $3, $4, FALSE, CURRENT_TIMESTAMP)',
        [userIdToNotify, 'Listing Approved 🎉', notificationMessage, 'Listings']
      );
    } catch (e: any) {
      console.error('Failed to insert property notification:', e);
    }

    return NextResponse.json({ success: true, propertyId: result.rows[0].id });
  } catch (error: any) {
    console.error("Failed to create property:", error);
    return NextResponse.json({ success: false, error: 'Failed to create property', details: error, stack: error.stack, pgMessage: error.message }, { status: 500 });
  }
}
