const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_bBU7wE1yjQkS@ep-square-truth-apbcxbyk-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&uselibpqcompat=true',
});

async function run() {
  try {
    const res = await pool.query('SELECT id, "propertyName", rent, "expectedRent", price FROM "Property" ORDER BY "createdAt" DESC LIMIT 5');
    console.log(res.rows);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
run();
