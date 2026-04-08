const { Pool } = require("pg");
require("dotenv").config();

const poolConfig = {
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
};

if (process.env.DATABASE_URL) {
  poolConfig.connectionString = process.env.DATABASE_URL;
} else {
  poolConfig.host = process.env.PG_HOST;
  poolConfig.port = process.env.PG_PORT;
  poolConfig.database = process.env.PG_DATABASE;
  poolConfig.user = process.env.PG_USER;
  poolConfig.password = process.env.PG_PASSWORD;
}

const pool = new Pool(poolConfig);

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
