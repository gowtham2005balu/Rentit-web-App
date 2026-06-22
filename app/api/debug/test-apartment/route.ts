import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM "Apartment" ORDER BY id DESC LIMIT 5');
    return NextResponse.json({ status: 200, rows: res.rows });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 200 });
  }
}
