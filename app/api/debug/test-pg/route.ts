import { NextResponse } from 'next/server';
import pool from '@/lib/db';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Ensure User 1 exists for Foreign Keys
    await pool.query(`
      INSERT INTO "User" (id, name, email, phone) 
      VALUES (1, 'Admin', 'admin@rentit.in', '9999999999') 
      ON CONFLICT DO NOTHING
    `).catch(() => {});
    
    await pool.query(`
      INSERT INTO users (id, name, email, mobile) 
      VALUES (1, 'Admin', 'admin@rentit.in', '9999999999') 
      ON CONFLICT DO NOTHING
    `).catch(() => {});

    const recentProps = await pool.query('SELECT id, type, price, created_at, owner_id FROM properties ORDER BY id DESC LIMIT 5').catch(() => ({rows:[]}));
    const apts = await pool.query('SELECT * FROM "Apartment" ORDER BY id DESC LIMIT 5').catch(() => ({rows:[]}));
    const coms = await pool.query('SELECT * FROM "Commercial" ORDER BY id DESC LIMIT 5').catch(() => ({rows:[]}));
    const flats = await pool.query('SELECT * FROM "Flatmate" ORDER BY id DESC LIMIT 5').catch(() => ({rows:[]}));
    
    return NextResponse.json({ 
      status: 'Success',
      properties: recentProps.rows,
      apartments: apts.rows,
      commercial: coms.rows,
      flatmate: flats.rows
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
