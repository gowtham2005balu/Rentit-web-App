import pool from './lib/db';

async function run() {
  try {
    await pool.query(`
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
    console.log('Notification table created successfully');
  } catch(e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

run();
