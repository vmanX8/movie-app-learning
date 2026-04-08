const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: Number(process.env.PG_PORT) || 5432,
  database: process.env.PG_DATABASE || "movie_app",
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "",
});

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("PostgreSQL pool error", err);
});

const query = (text, params = []) => pool.query(text, params);

module.exports = {
  query,
  pool,
};
