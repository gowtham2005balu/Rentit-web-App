const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true }
});

async function testConnection() {
  try {
    console.log("Connecting to Neon Database...");
    const client = await pool.connect();
    console.log("✅ Successfully connected to Neon PostgreSQL!");
    
    const res = await client.query('SELECT * FROM "User"');
    console.log(`\nFound ${res.rows.length} users in your database!`);
    console.log("Here are the users:");
    console.table(res.rows);
    
    client.release();
  } catch (err) {
    console.error("❌ Error connecting to the database:", err.message);
  } finally {
    pool.end();
  }
}

testConnection();
