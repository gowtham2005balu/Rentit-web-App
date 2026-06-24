const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_bBU7wE1yjQkS@ep-square-truth-apbcxbyk-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

async function main() {
  try {
    const res = await pool.query('SELECT * FROM "Property" ORDER BY id DESC LIMIT 5');
    console.log("Property table:");
    console.table(res.rows);

    const apt = await pool.query('SELECT * FROM "Apartment" ORDER BY id DESC LIMIT 5');
    console.log("Apartment table:");
    console.table(apt.rows);
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
main();
