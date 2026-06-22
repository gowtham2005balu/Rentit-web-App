import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId, name, email, city } = await req.json();
    
    // Ensure columns exist (Prisma schema might not have all of them)
    try {
      await pool.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS name VARCHAR(100);`);
      await pool.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS city VARCHAR(100);`);
    } catch (e) { /* ignore if columns already exist */ }

    const isMobile = userId && userId.toString().length === 10;

    // Save profile data to Neon PostgreSQL
    const { rowCount } = await pool.query(
      isMobile 
        ? `UPDATE "User" SET name = $1, email = $2, city = $3, "isProfileComplete" = true WHERE mobile = $4` 
        : `UPDATE "User" SET name = $1, email = $2, city = $3, "isProfileComplete" = true WHERE id = $4`,
      [name, email, city, userId]
    );
    
    if (rowCount === 0) {
      console.warn(`[Profile] User not found for: ${userId}, creating new user`);
      // Auto-create user with profile data
      try {
        await pool.query(
          'INSERT INTO "User" (mobile, name, email, city, "isProfileComplete", "createdAt") VALUES ($1, $2, $3, $4, true, NOW())',
          [userId, name, email, city]
        );
      } catch (insertErr: any) {
        console.warn("Could not auto-create user:", insertErr.message);
      }
    }
    
    console.log(`[Profile] Saved: name=${name}, email=${email}, city=${city}`);
    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("PROFILE UPDATE ERROR:", error);
    return NextResponse.json({ error: "Failed to update profile", details: error?.message || "Unknown error" }, { status: 500 });
  }
}
