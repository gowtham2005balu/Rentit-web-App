import { NextResponse } from 'next/server';

import pool from '@/lib/db';

export async function GET() {
  try {
    const data = {
        userId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        city: 'Chennai',
        locality: 'Adyar',
        street: 'Test',
        landmark: 'Near Metro',
        propertyType: 'Office Space',
        buildingType: 'Abas enclave',
        propertyAge: '5-10 Years',
        floor: 8,
        totalFloor: 15,
        builtUpArea: 1581,
        expectedRent: 40000,
        deposit: 120000,
        maintenanceAmount: 4000,
        maintenance: 'Extra',
        rentNegotiable: false,
        depositNegotiable: false,
        contactName: 'Rajesh Kumar',
        description: 'Test Description',
        images: []
    };
    
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    
    const queryStr = `INSERT INTO "Commercial" ("${keys.join('", "')}") VALUES (${placeholders}) RETURNING id;`;
    const res = await pool.query(queryStr, values);
    
    return NextResponse.json({ success: true, id: res.rows[0].id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack, query: err.query });
  }
}
