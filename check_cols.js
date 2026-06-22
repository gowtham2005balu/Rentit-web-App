const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_FC6g9nMXZvkc@ep-royal-haze-aonjbefx-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full',
});

async function run() {
  try {
    const res = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'properties'");
    console.log(res.rows);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
run();
