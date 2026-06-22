import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Ensure tables exist
async function ensureTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "AppConversation" (
      id SERIAL PRIMARY KEY,
      "propertyId" VARCHAR(255) NOT NULL,
      "renterId" VARCHAR(255) NOT NULL,
      "ownerId" VARCHAR(255) NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS "AppMessage" (
      id SERIAL PRIMARY KEY,
      "conversationId" INTEGER NOT NULL,
      "senderId" VARCHAR(255) NOT NULL,
      text TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { propertyId, ownerId, renterId, propertyTitle } = data;

    if (!propertyId || !ownerId || !renterId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    if (ownerId === renterId) {
      return NextResponse.json({ success: false, error: 'Cannot message yourself' }, { status: 400 });
    }

    await ensureTables();

    // 1. Check if conversation already exists
    const checkRes = await pool.query(
      'SELECT id FROM "AppConversation" WHERE "propertyId" = $1 AND "renterId" = $2 AND "ownerId" = $3 LIMIT 1',
      [String(propertyId), String(renterId), String(ownerId)]
    );

    let conversationId;

    if (checkRes.rows.length > 0) {
      // Conversation already exists
      conversationId = checkRes.rows[0].id;
    } else {
      // 2. Create new conversation
      const insertConvRes = await pool.query(
        'INSERT INTO "AppConversation" ("propertyId", "renterId", "ownerId", "createdAt") VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id',
        [String(propertyId), String(renterId), String(ownerId)]
      );
      conversationId = insertConvRes.rows[0].id;

      // 3. Send initial message from renter
      const renterMsg = `Hi, I am interested in ${propertyTitle || 'your property'}. Is it still available?`;
      await pool.query(
        'INSERT INTO "AppMessage" ("conversationId", "senderId", text, "createdAt") VALUES ($1, $2, $3, CURRENT_TIMESTAMP)',
        [conversationId, String(renterId), renterMsg]
      );

      // Wait a tiny bit so the auto-reply is sequentially later
      await new Promise(r => setTimeout(r, 100));

      // 4. Send auto reply from owner
      const ownerMsg = `Hi there! Yes, it is still available. Let me know if you have any questions or want to schedule a visit.`;
      await pool.query(
        'INSERT INTO "AppMessage" ("conversationId", "senderId", text, "createdAt") VALUES ($1, $2, $3, CURRENT_TIMESTAMP)',
        [conversationId, String(ownerId), ownerMsg]
      );
    }

    return NextResponse.json({ success: true, conversationId });
  } catch (error: any) {
    console.error('Contact owner error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
