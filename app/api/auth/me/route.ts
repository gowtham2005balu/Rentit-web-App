import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    
    const isMobile = userId && userId.toString().length === 10;
    
    // Fetch user profile directly from Neon PostgreSQL
    const result = await pool.query(
      isMobile 
        ? `SELECT id, name, email, city, mobile, photo, "createdAt" as created_at FROM "User" WHERE mobile = $1` 
        : `SELECT id, name, email, city, mobile, photo, "createdAt" as created_at FROM "User" WHERE id = $1`,
      [userId]
    );
    
    const user = result.rows[0];
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user profile", details: error.message }, { status: 500 });
  }
}
