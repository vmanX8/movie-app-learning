const db = require("../config/db");

const findByUsername = async (username) => {
  const result = await db.query(
    "SELECT id, username, pass FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0] || null;
};

module.exports = {
  findByUsername,
};