import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        mobile VARCHAR(20) UNIQUE NOT NULL,
        otp VARCHAR(10),
        is_verified BOOLEAN DEFAULT FALSE,
        name VARCHAR(100),
        email VARCHAR(100),
        city VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        price NUMERIC,
        type VARCHAR(50),
        location_address TEXT,
        owner_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS "Notification" (
        id SERIAL PRIMARY KEY,
        "userId" VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        message TEXT,
        type VARCHAR(50),
        "isRead" BOOLEAN DEFAULT FALSE,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    return NextResponse.json({ message: 'Database tables initialized successfully!' });
  } catch (error: any) {
    console.error("Error initializing tables", error);
    return NextResponse.json({ error: 'Failed to initialize tables', details: error.message }, { status: 500 });
  }
}
