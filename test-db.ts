import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_bBU7wE1yjQkS@ep-square-truth-apbcxbyk-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    const tableName = '"Apartment"';
    const mapped = {
      userId: 1,
      city: 'Test City Server',
      locality: 'Test Locality',
      street: '123 Test St',
      landmark: 'Test Landmark',
      buildingType: 'Apartment',
      bhkType: '2 BHK',
      floor: 2,
      totalFloor: 5,
      builtUpArea: 1000,
      propertyAge: '1-5 Years',
      expectedRent: 20000,
      deposit: 100000,
      description: 'Test Description',
      createdAt: new Date()
    };

    const cleanMapped: any = {};
    for (const key in mapped) {
      if ((mapped as any)[key] !== undefined && (mapped as any)[key] !== null) {
        cleanMapped[key] = (mapped as any)[key];
      }
    }

    const keys = Object.keys(cleanMapped);
    const values = Object.values(cleanMapped);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    
    const queryStr = `INSERT INTO ${tableName} ("${keys.join('", "')}") VALUES (${placeholders}) RETURNING id;`;
    
    console.log("Query:", queryStr);
    console.log("Values:", values);

    const result = await pool.query(queryStr, values);
    console.log("Success! Inserted ID:", result.rows[0].id);
  } catch (err) {
    console.error("Error inserting:", err);
  } finally {
    pool.end();
  }
}

run();
