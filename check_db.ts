import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_1YhM8XyabJcx@ep-late-breeze-a56j4u03-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'
});

async function checkDb() {
  try {
    const { rows: notifications } = await pool.query('SELECT * FROM "Notification" ORDER BY "createdAt" DESC LIMIT 10');
    const { rows: users } = await pool.query('SELECT id, name, mobile FROM "User" ORDER BY "createdAt" DESC LIMIT 5');
    const { rows: apartments } = await pool.query('SELECT id, "userId", "createdAt" FROM "Apartment" ORDER BY "createdAt" DESC LIMIT 5').catch(() => ({ rows: [] }));
    const { rows: pgs } = await pool.query('SELECT id, owner_id, created_at FROM properties ORDER BY created_at DESC LIMIT 5').catch(() => ({ rows: [] }));
    
    fs.writeFileSync('d:\\huzzler web App\\db_status.log', JSON.stringify({ notifications, users, apartments, pgs }, null, 2));
    console.log("Wrote db_status.log");
  } catch(e: any) {
    fs.writeFileSync('d:\\huzzler web App\\db_status.log', JSON.stringify({ error: e.message }, null, 2));
  } finally {
    pool.end();
  }
}

checkDb();
