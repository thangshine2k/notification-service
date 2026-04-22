import { pool } from "../config/db.js";

export const getUsers = async () => {
  const res = await pool.query("SELECT * FROM users");
  return res.rows;
};