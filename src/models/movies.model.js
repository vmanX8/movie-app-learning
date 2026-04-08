const db = require("../config/db");

const getAll = async () => {
  const result = await db.query("SELECT id, title, year FROM movies ORDER BY id");
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(
    "SELECT id, title, year FROM movies WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
};

const create = async (title, year) => {
  const result = await db.query(
    "INSERT INTO movies (title, year) VALUES ($1, $2) RETURNING id, title, year",
    [title, year]
  );
  return result.rows[0];
};

const update = async (id, title, year) => {
  const result = await db.query(
    "UPDATE movies SET title = $1, year = $2 WHERE id = $3 RETURNING id, title, year",
    [title, year, id]
  );
  return result.rows[0] || null;
};

const remove = async (id) => {
  const result = await db.query("DELETE FROM movies WHERE id = $1", [id]);
  return result.rowCount;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};