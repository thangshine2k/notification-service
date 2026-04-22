import { pool } from "../config/db.js";

export const createOrder = async (data) => {
  const { user_id, items, note } = data;

  const query = `
    INSERT INTO orders (user_id, items, note)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [user_id, JSON.stringify(items), note || ""];

  const result = await pool.query(query, values);

  return result.rows[0];
};
