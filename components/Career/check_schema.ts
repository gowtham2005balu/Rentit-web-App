import pool from './lib/db';

async function checkSchema() {
  const res = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'properties';
  `);
  console.log(JSON.stringify(res.rows, null, 2));
  process.exit(0);
}

checkSchema().catch(console.error);
