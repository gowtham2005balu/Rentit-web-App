import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_FC6g9nMXZvkc@ep-royal-haze-aonjbefx-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full',
});

async function run() {
  try {
    const res1 = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'properties'");
    console.log('--- properties columns ---');
    console.log(res1.rows);
  } catch (e) {
    console.log('Error querying:', e.message);
  }
  await pool.end();
}

run();
