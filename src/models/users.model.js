const db = require("../config/db");

const findByUsername = async (username) => {
  const result = await db.query(
    "SELECT id, username, pass FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0] || null;
};

const create = async (username, hashedPassword) => {
  const result = await db.query(
    "INSERT INTO users (username, pass) VALUES ($1, $2) RETURNING id, username",
    [username, hashedPassword]
  );
  return result.rows[0];
};

module.exports = {
  findByUsername,
  create,
};