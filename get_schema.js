import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_1YhM8XyabJcx@ep-late-breeze-a56j4u03-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'
});

async function main() {
  try {
    const res = await pool.query(`SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name IN ('Conversation', 'Message', 'conversation', 'message', 'conversations', 'messages', 'Conversations', 'Messages') ORDER BY table_name, ordinal_position;`);
    fs.writeFileSync('schema_out.json', JSON.stringify(res.rows, null, 2));
    console.log('Schema written to schema_out.json');
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}
main();
