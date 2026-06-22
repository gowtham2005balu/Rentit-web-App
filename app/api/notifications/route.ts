import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Notification" (
        id SERIAL PRIMARY KEY,
        "recipientId" VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        body TEXT,
        category VARCHAR(50),
        "isRead" BOOLEAN DEFAULT FALSE,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `).catch(e => console.error(e));

    let rows: any[] = [];
    try {
      const result = await pool.query('SELECT * FROM "Notification" WHERE "recipientId" = $1 ORDER BY "createdAt" DESC', [userId]);
      rows = result.rows.map(r => {
        // Fix Postgres TIMESTAMP without timezone being parsed as local time by pg driver
        let fixedDate = r.createdAt;
        if (r.createdAt instanceof Date) {
          fixedDate = new Date(r.createdAt.getTime() - r.createdAt.getTimezoneOffset() * 60000);
        }
        
        return {
          id: r.id,
          userId: r.recipientId,
          title: r.title,
          message: r.body,
          type: r.category,
          isRead: r.isRead,
          createdAt: fixedDate
        };
      });
    } catch (e: any) {
      console.error(e);
      throw e;
    }

    try {
      require('fs').writeFileSync('d:\\huzzler web App\\debug.log', JSON.stringify({ userId, rows }, null, 2));
    } catch(e) {}

    return NextResponse.json({ notifications: rows });
  } catch (error: any) {
    console.error('Failed to fetch notifications:', error);
    try {
      require('fs').writeFileSync('d:\\huzzler web App\\error.log', JSON.stringify({ message: "Fetch notifications failed", details: error.message, stack: error.stack }, null, 2));
    } catch(err) {}
    return NextResponse.json({ error: 'Failed to fetch notifications', details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { userId, title, message, type } = data;

    if (!userId || !title || !message) {
      return NextResponse.json({ error: 'userId, title, and message are required' }, { status: 400 });
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Notification" (
        id SERIAL PRIMARY KEY,
        "recipientId" VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        body TEXT,
        category VARCHAR(50),
        "isRead" BOOLEAN DEFAULT FALSE,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `).catch(e => console.error(e));

    const { rows } = await pool.query(
      'INSERT INTO "Notification" ("recipientId", title, body, category, "isRead", "createdAt") VALUES ($1, $2, $3, $4, FALSE, CURRENT_TIMESTAMP) RETURNING *',
      [String(userId), title, message, type || 'General']
    );

    let fixedDate = rows[0].createdAt;
    if (rows[0].createdAt instanceof Date) {
      fixedDate = new Date(rows[0].createdAt.getTime() - rows[0].createdAt.getTimezoneOffset() * 60000);
    }

    const notification = {
      id: rows[0].id,
      userId: rows[0].recipientId,
      title: rows[0].title,
      message: rows[0].body,
      type: rows[0].category,
      isRead: rows[0].isRead,
      createdAt: fixedDate
    };

    return NextResponse.json({ success: true, notification });
  } catch (error: any) {
    console.error('Failed to create notification:', error);
    return NextResponse.json({ error: 'Failed to create notification', details: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { userId, notificationId, markAll } = data;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    if (markAll) {
      await pool.query('UPDATE "Notification" SET "isRead" = TRUE WHERE "recipientId" = $1', [String(userId)]);
    } else if (notificationId) {
      await pool.query('UPDATE "Notification" SET "isRead" = TRUE WHERE "recipientId" = $1 AND id = $2', [String(userId), parseInt(notificationId)]);
    } else {
      return NextResponse.json({ error: 'notificationId or markAll is required' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to update notification:', error);
    return NextResponse.json({ error: 'Failed to update notification', details: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const notificationId = searchParams.get('notificationId');
    const clearAll = searchParams.get('clearAll') === 'true';

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    if (clearAll) {
      await pool.query('DELETE FROM "Notification" WHERE "recipientId" = $1', [String(userId)]);
    } else if (notificationId) {
      await pool.query('DELETE FROM "Notification" WHERE "recipientId" = $1 AND id = $2', [String(userId), parseInt(notificationId)]);
    } else {
      return NextResponse.json({ error: 'notificationId or clearAll is required' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete notification:', error);
    return NextResponse.json({ error: 'Failed to delete notification', details: error.message }, { status: 500 });
  }
}
