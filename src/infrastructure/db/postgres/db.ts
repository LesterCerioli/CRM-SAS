import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER || "your_db_user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "your_database",
  password: process.env.DB_PASSWORD || "your_password",
  port: Number(process.env.DB_PORT) || 5432, // PostgreSQL default port
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err: Error) => {
  console.error("❌ Database connection error", err);
});

export { pool };
