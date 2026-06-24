import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const result = await pool.query('SELECT id, "propertyName", rent, city, "propertyType", "roomType" FROM "Property" ORDER BY id DESC LIMIT 5');
    return NextResponse.json({ success: true, properties: result.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
