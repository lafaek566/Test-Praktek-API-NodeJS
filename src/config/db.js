// config/db.js
import dotenv from "dotenv";
import mysql from "mysql2/promise"; // Use the promise-based version of mysql2

// Load environment variables from .env file
dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Adjust as per your needs
  queueLimit: 0,
});

export default pool;
