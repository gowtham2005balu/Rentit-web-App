import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true },
});

async function run() {
  try {
    const mobile = "9025835854";
    const otp = "123456";
    
    console.log("Adding columns...");
    await pool.query(`
      ALTER TABLE "User" 
      ADD COLUMN IF NOT EXISTS mobile TEXT, 
      ADD COLUMN IF NOT EXISTS otp TEXT;
    `);

    console.log("Querying User...");
    const { rows } = await pool.query('SELECT * FROM "User" WHERE mobile = $1', [mobile]);
    console.log("Rows:", rows);
    
    console.log("Success!");
  } catch (error) {
    console.error("FAILED WITH ERROR:", error.message);
  } finally {
    await pool.end();
  }
}
run();
