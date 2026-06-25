import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const mobile = body.mobile || body.phone;
    if (!mobile) return NextResponse.json({ error: "Mobile number is required" }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Ensure the otp column exists (Prisma-created table doesn't have it)
    try {
      await pool.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS otp VARCHAR(6);`);
    } catch (e) { /* column might already exist */ }

    // Find or create user
    try {
      const result = await pool.query('SELECT * FROM "User" WHERE mobile = $1', [mobile]);
      
      if (result.rows.length === 0) {
        await pool.query(
          'INSERT INTO "User" (mobile, otp, "createdAt", "isProfileComplete") VALUES ($1, $2, NOW(), false)',
          [mobile, otp]
        );
        console.log(`[DB] New user created for ${mobile}`);
      } else {
        await pool.query('UPDATE "User" SET otp = $1 WHERE mobile = $2', [otp, mobile]);
        console.log(`[DB] OTP updated for ${mobile}`);
      }
    } catch (dbError: any) {
      console.error("Neon DB Error:", dbError.message);
    }
    
    // Send SMS
    try {
      let smsSent = false;

      if (process.env.API_KEY && process.env.API_KEY.includes('-')) {
        const url = `https://2factor.in/API/V1/${process.env.API_KEY}/SMS/${mobile}/${otp}`;
        const response = await fetch(url, { method: 'GET' });
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          console.log(`[Real SMS] 2Factor Response:`, data);
          if (data.Status !== 'Error') {
            smsSent = true;
          }
        } catch (e) {
           console.log(`[Real SMS] 2Factor Non-JSON:`, text);
        }
      } 
      
      if (!smsSent && process.env.FAST2SMS_API_KEY && process.env.FAST2SMS_API_KEY !== "") {
        if (process.env.FAST2SMS_OTP_ID) {
          // Use Fast2SMS specialized OTP API
          const smsResponse = await fetch('https://www.fast2sms.com/dev/otp/send', {
            method: 'POST',
            headers: {
              'authorization': process.env.FAST2SMS_API_KEY as string,
              'Content-Type': 'application/json',
              'accept': 'application/json'
            },
            body: JSON.stringify({
              mobile: mobile,
              otp_id: process.env.FAST2SMS_OTP_ID
            })
          });
          const smsData = await smsResponse.json();
          console.log(`[Real SMS] Fast2SMS OTP Send Response:`, smsData);
          if (smsData.request_id || smsData.message === 'OTP Sent Successfully' || smsData.return === true) {
             smsSent = true;
          }
        } else {
          // Fallback to bulkV2 if no OTP_ID
          const bodyParams = new URLSearchParams();
          bodyParams.append('route', 'otp');
          bodyParams.append('variables_values', otp);
          bodyParams.append('numbers', mobile);
          
          const smsResponse = await fetch('https://www.fast2sms.com/dev/bulkV2', {
            method: 'POST',
            headers: {
              'authorization': process.env.FAST2SMS_API_KEY as string,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyParams.toString()
          });
          const smsData = await smsResponse.json();
          console.log(`[Real SMS] Fast2SMS bulkV2 Response:`, smsData);
          if (smsData.return === true) smsSent = true;
        }
      }

      if (!smsSent && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
        const twilioSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
        
        const formattedMobile = mobile.startsWith('+') ? mobile : `+91${mobile}`;

        const basicAuth = Buffer.from(`${twilioSid}:${twilioAuth}`).toString('base64');
        const bodyParams = new URLSearchParams({
          To: formattedMobile,
          From: twilioPhone,
          Body: `Your Rentit verification OTP is ${otp}.`
        });
        
        const smsResponse = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: bodyParams.toString()
        });
        
        const smsData = await smsResponse.json();
        console.log(`[Real SMS] Twilio Response:`, smsData);
        if (smsData.sid) smsSent = true;
      }
      
      if (!smsSent) {
        console.log('---------------------------------');
        console.log(`[Mock SMS] OTP for ${mobile} is: ${otp}`);
        console.log('---------------------------------');
      }
    } catch (smsError) {
       console.error("SMS Provider Error:", smsError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully',
      otp: otp 
    });
  } catch (error: any) {
    console.error("SEND OTP ERROR:", error);
    return NextResponse.json({ error: "Failed to send OTP", details: error?.message || "Unknown error" }, { status: 500 });
  }
}
