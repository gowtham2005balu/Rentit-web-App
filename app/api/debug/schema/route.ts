import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import * as fs from 'fs';

export async function GET() {
  try {
    const tables = ['Apartment', 'Commercial', 'Flatmate', 'Property'];
    const schema: any = {};
    for (const table of tables) {
      const res = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = $1;
      `, [table]);
      schema[table] = res.rows;
    }
    fs.writeFileSync('d:\\huzzler web App\\db_schema.json', JSON.stringify(schema, null, 2));
    return NextResponse.json({ success: true, schema });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
