import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "demo_db",
  password: "123456",
  port: 5432,
});
