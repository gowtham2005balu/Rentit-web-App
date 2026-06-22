import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const results: any = { timestamp: new Date().toISOString() };

  // Test 1: Basic connection
  try {
    const res = await pool.query('SELECT NOW() as time');
    results.connection = { status: 'OK', serverTime: res.rows[0].time };
  } catch (err: any) {
    results.connection = { status: 'FAILED', error: err.message };
    return NextResponse.json(results, { status: 500 });
  }

  // Test 2: Check User table schema
  try {
    const res = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'User' 
      ORDER BY ordinal_position
    `);
    results.userTableColumns = res.rows;
  } catch (err: any) {
    results.userTableColumns = { error: err.message };
  }

  // Test 3: Check if key columns exist
  try {
    const cols = results.userTableColumns?.map((c: any) => c.column_name) || [];
    results.missingColumns = [];
    for (const needed of ['otp', 'name', 'email', 'city', 'isProfileComplete']) {
      if (!cols.includes(needed)) {
        results.missingColumns.push(needed);
      }
    }
  } catch (err: any) {
    results.columnCheck = { error: err.message };
  }

  // Test 4: Count users
  try {
    const res = await pool.query('SELECT COUNT(*) as count FROM "User"');
    results.userCount = res.rows[0].count;
  } catch (err: any) {
    results.userCount = { error: err.message };
  }

  // Test 5: List all tables
  try {
    const res = await pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    results.tables = res.rows.map((r: any) => r.table_name);
  } catch (err: any) {
    results.tables = { error: err.message };
  }

  return NextResponse.json(results);
}
