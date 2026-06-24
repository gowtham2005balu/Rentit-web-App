import pool from './lib/db';

async function run() {
  try {
    const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Property'
    `);
    console.log(res.rows);
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}
run();
