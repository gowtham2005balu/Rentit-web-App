import pool from './lib/db';

async function runMigration() {
  try {
    await pool.query(`
      ALTER TABLE properties ADD COLUMN IF NOT EXISTS details JSONB;
      
      CREATE TABLE IF NOT EXISTS "User" (
        id SERIAL PRIMARY KEY,
        mobile VARCHAR(15) UNIQUE NOT NULL,
        otp VARCHAR(6),
        name VARCHAR(100),
        email VARCHAR(100),
        city VARCHAR(100),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Migration successful: added details column");
  } catch (e) {
    console.error("Migration failed:", e);
  } finally {
    process.exit(0);
  }
}

runMigration();
