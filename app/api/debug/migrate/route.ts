import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    await pool.query(`ALTER TABLE properties ADD COLUMN IF NOT EXISTS details JSONB;`);
    return NextResponse.json({ success: true, message: "Added details column" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
