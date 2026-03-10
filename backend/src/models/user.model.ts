import { pool } from "../config/db.js";
import { User } from "../types/auth.types.js";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] ?? null;
};

export const createUser = async (
  full_name: string,
  email: string,
  password_hash: string
): Promise<User> => {
  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash)
     VALUES ($1, $2, $3) RETURNING *`,
    [full_name, email, password_hash]
  );
  return result.rows[0];
};