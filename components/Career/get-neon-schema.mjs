import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_bBU7wE1yjQkS@ep-square-truth-apbcxbyk-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const tables = ['Apartment', 'Commercial', 'Flatmate', 'Property'];
  for (const table of tables) {
    const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = $1;
    `, [table]);
    console.log(`Table ${table}:`, res.rows);
  }
  process.exit(0);
}
main().catch(console.error);
