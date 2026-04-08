const { Pool } = require("pg");
require("dotenv").config();

const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USER,
  PG_PASSWORD,
} = process.env;

if (!PG_HOST || !PG_PORT || !PG_DATABASE || !PG_USER) {
  console.error("Missing required PG environment variables in .env");
  process.exit(1);
}

const adminPool = new Pool({
  host: PG_HOST,
  port: Number(PG_PORT),
  user: PG_USER,
  password: PG_PASSWORD,
  database: "postgres",
});

const appPool = new Pool({
  host: PG_HOST,
  port: Number(PG_PORT),
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
});

const createDatabase = async () => {
  try {
    await adminPool.query(`CREATE DATABASE ${PG_DATABASE}`);
    console.log(`Database '${PG_DATABASE}' created.`);
  } catch (error) {
    if (error.code === "42P04") {
      console.log(`Database '${PG_DATABASE}' already exists.`);
    } else {
      throw error;
    }
  }
};

const createTables = async () => {
  await appPool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      pass TEXT NOT NULL
    );
  `);

  await appPool.query(`
    CREATE TABLE IF NOT EXISTS movies (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      year INTEGER NOT NULL
    );
  `);

  console.log("Tables 'users' and 'movies' are ready.");
};

const main = async () => {
  try {
    await createDatabase();
  } finally {
    await adminPool.end();
  }

  try {
    await createTables();
  } finally {
    await appPool.end();
  }
};

main().catch((error) => {
  console.error("Database setup failed:", error.message || error);
  process.exit(1);
});
