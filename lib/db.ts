import { Pool } from 'pg';

// Extend the NodeJS global type to include our pool
declare global {
  var _dbPool: Pool | undefined;
}

function createPool(): Pool {
  const newPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 20, // Increased to support concurrent queries
    idleTimeoutMillis: 60000,
    connectionTimeoutMillis: 15000, // Important for Neon cold-starts
  });
  
  newPool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });
  
  return newPool;
}

let pool: Pool;

if (process.env.NODE_ENV === 'production') {
  pool = createPool();
} else {
  if (!global._dbPool) {
    global._dbPool = createPool();
  }
  pool = global._dbPool;
}

export default pool;
