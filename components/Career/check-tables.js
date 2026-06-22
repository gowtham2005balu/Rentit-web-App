import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_FC6g9nMXZvkc@ep-royal-haze-aonjbefx-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full',
});

async function run() {
  try {
    const res1 = await pool.query('SELECT * FROM "User" ORDER BY "createdAt" DESC LIMIT 5');
    console.log('--- "User" table ---');
    console.log(res1.rows);
  } catch (e) {
    console.log('Error querying "User":', e.message);
  }

  try {
    const res2 = await pool.query('SELECT * FROM users ORDER BY id DESC LIMIT 5');
    console.log('--- users table ---');
    console.log(res2.rows);
  } catch (e) {
    console.log('Error querying users:', e.message);
  }

  await pool.end();
}

run();
