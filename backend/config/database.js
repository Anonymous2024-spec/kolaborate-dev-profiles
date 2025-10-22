const mysql = require("mysql2");
require("dotenv").config();

console.log("Creating database connection pool...");

// Create connection pool instead of single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "kolaborate_devs",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed: " + err.message);
    console.log("💡 Please check:");
    console.log("1. Is MySQL running in XAMPP/WAMP?");
    console.log("2. Are the credentials in .env correct?");
    console.log('3. Does the database "kolaborate_devs" exist?');
    return;
  }
  console.log("✅ Connected to MySQL database successfully!");
  connection.release(); // Release the connection back to the pool
});

// Use promise wrapper for async/await
const promisePool = pool.promise();

module.exports = promisePool;
