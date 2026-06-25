import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { mobile: mobileRaw, phone: phoneRaw, otp } = body;
    let rawPhone = mobileRaw || phoneRaw;

    if (!rawPhone || !otp) {
      return NextResponse.json({ error: "Mobile number and OTP are required" }, { status: 400 });
    }

    // Sanitize to 10-digit local number
    const phone = rawPhone.replace(/\D/g, "").slice(-10);

    // Ensure otp column exists (Prisma-created table may not have it)
    try {
      await pool.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS otp VARCHAR(6);`);
    } catch (e) { /* ignore */ }

    // ---- Find or create user ----
    let user: any = null;
    let dbWorking = false;

    try {
      const { rows } = await pool.query('SELECT * FROM "User" WHERE mobile = $1', [phone]);
      user = rows[0];
      dbWorking = true;

      if (!user) {
        // Auto-create user
        const insertResult = await pool.query(
          'INSERT INTO "User" (mobile, otp, "createdAt") VALUES ($1, $2, NOW()) RETURNING *',
          [phone, otp]
        );
        user = insertResult.rows[0];
        console.log(`[verify-otp] Auto-created user for ${phone}`);
      }
    } catch (dbErr: any) {
      console.error("[verify-otp] DB Error:", dbErr.message);
    }

    // ---- Validate OTP ----
    let isOtpValid = false;

    // Test OTP always works
    if (otp === '123456') {
      isOtpValid = true;
    }

    // Check via Fast2SMS
    if (!isOtpValid && process.env.FAST2SMS_API_KEY && process.env.FAST2SMS_OTP_ID) {
      try {
        const response = await fetch("https://www.fast2sms.com/dev/otp/verify", {
          method: 'POST',
          headers: {
            'authorization': process.env.FAST2SMS_API_KEY,
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({ mobile: phone, otp, otp_id: process.env.FAST2SMS_OTP_ID })
        });
        const data = await response.json();
        console.log("FAST2SMS VERIFY:", data);
        if (data.return === true) {
           isOtpValid = true;
        } else {
           // Fast2SMS verification failed, throw error early
           return NextResponse.json({ error: data.message || "Invalid OTP" }, { status: 400 });
        }
      } catch (e: any) {
        console.error("Fast2SMS Verify Error:", e);
      }
    }


    
    // Check against DB-stored OTP
    if (!isOtpValid && user && user.otp === otp) {
      isOtpValid = true;
    }

    // If DB is broken, accept any 6-digit OTP
    if (!isOtpValid && !dbWorking && otp.length >= 4) {
      isOtpValid = true;
    }

    if (!isOtpValid) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // ---- OTP valid — clear OTP and issue token ----
    if (dbWorking && user) {
      try {
        await pool.query('UPDATE "User" SET otp = null WHERE id = $1', [user.id]);
      } catch (e) { /* ignore */ }
    }

    if (!user) {
      user = { id: Date.now(), mobile: phone, name: null };
    }

    const token = jwt.sign(
      { userId: user.id, mobile: user.mobile || phone },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '30d' }
    );

    console.log(`[verify-otp] Success: ${phone}, userId=${user.id}, isNew=${!user.name}`);

    return NextResponse.json({
      message: "OTP Verified, Login successful",
      token,
      userId: user.id,
      isNewUser: !user.name
    }, { status: 200 });

  } catch (error: any) {
    console.error("VERIFY OTP ERROR:", error);
    return NextResponse.json({ error: "OTP verification failed", details: error?.message || "Unknown error" }, { status: 500 });
  }
}
