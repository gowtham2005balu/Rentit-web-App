import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, email, city, mobile, photo } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const isMobile = userId && userId.toString().length === 10;

    await pool.query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS photo TEXT').catch(() => {});

    const data = { userId, name, email, city, mobile, photo };

    let result;

    if (isMobile) {
      // Check if user exists by mobile
      const checkUser = await pool.query(`SELECT id FROM "User" WHERE mobile = $1`, [userId]);
      if (checkUser.rowCount > 0) {
        result = await pool.query(`
          UPDATE "User" 
          SET name = $1, email = $2, city = $3, mobile = $4, photo = $5 
          WHERE mobile = $6 
          RETURNING id, name, email, city, mobile, photo;
        `, [name, email, city, mobile, photo, userId]);
      } else {
        result = await pool.query(`
          INSERT INTO "User" (name, email, city, mobile, photo, "createdAt")
          VALUES ($1, $2, $3, $4, $5, NOW())
          RETURNING id, name, email, city, mobile, photo;
        `, [name, email, city, mobile, photo]);
      }
    } else {
      // Check if user exists by ID
      const checkUser = await pool.query(`SELECT id FROM "User" WHERE id = $1`, [userId]);
      if (checkUser.rowCount > 0) {
        result = await pool.query(`
          UPDATE "User" 
          SET name = $1, email = $2, city = $3, mobile = $4, photo = $5 
          WHERE id = $6 
          RETURNING id, name, email, city, mobile, photo;
        `, [name, email, city, mobile, photo, userId]);
      } else {
        result = await pool.query(`
          INSERT INTO "User" (id, name, email, city, mobile, photo, "createdAt")
          VALUES ($6, $1, $2, $3, $4, $5, NOW())
          RETURNING id, name, email, city, mobile, photo;
        `, [name, email, city, mobile, photo, userId]);
      }
    }

    return NextResponse.json({ success: true, user: result.rows[0] });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile", details: error.message }, { status: 500 });
  }
}
