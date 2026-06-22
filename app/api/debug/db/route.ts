import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Check tables
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    let properties = [];
    try {
      const apt = await pool.query('SELECT * FROM "Apartment" LIMIT 5');
      const comm = await pool.query('SELECT * FROM "Commercial" LIMIT 5');
      properties = { apartment: apt.rows, commercial: comm.rows };
    } catch (err) {}

    return NextResponse.json({ tables: tables.rows, properties });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
