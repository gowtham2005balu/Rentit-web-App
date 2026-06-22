require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Database Tables (Backend Storage)
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        mobile VARCHAR(20) UNIQUE NOT NULL,
        otp VARCHAR(10),
        is_verified BOOLEAN DEFAULT FALSE,
        name VARCHAR(100),
        email VARCHAR(100),
        city VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        price NUMERIC,
        type VARCHAR(50),
        location_address TEXT,
        owner_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Database tables initialized (Neon Postgres)");
  } catch (err) {
    console.error("❌ Error initializing tables", err);
  }
};

initDB();

// Import Routes
const authRoutes = require('./routes/auth');

// Use Routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
