import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const mobile = "9025835856"; // another new number
    let logs: any[] = [];

    // Test Fast2SMS V3 Send
    if (process.env.FAST2SMS_API_KEY) {
      const smsResponse = await fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS_API_KEY}&route=v3&sender_id=TXTIND&message=Your%20OTP%20is%20123456&language=english&flash=0&numbers=${mobile}`, {
        method: 'GET'
      });
      const smsData = await smsResponse.text();
      logs.push({ provider: 'Fast2SMS /dev/bulkV2 v3', text: smsData });
    }

    return NextResponse.json({ logs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
