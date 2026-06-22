import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://neondb_owner:npg_gS17UsqWAcFV@ep-lively-wildflower-a8m40e4r-pooler.eastus2.azure.neon.tech/neondb?sslmode=verify-full',
});

async function checkDB() {
  try {
    const res = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);
    console.log('Tables in DB:', res.rows.map(r => r.table_name));
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}

checkDB();
