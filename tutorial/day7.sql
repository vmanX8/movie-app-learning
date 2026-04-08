--Seed sample data

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  pass TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL
);

-- sample user and sample movies
INSERT INTO users (username, pass)
VALUES ('admin', '$2b$10$A9RRgTmq/mjKSi94vLyjFOiQbjIhuCWbzswQrdWZMqOioXUmv3Jxq');


INSERT INTO movies (title, year) VALUES
  ('Interstellar', 2014),
  ('The Dark Knight', 2008),
  ('Inception', 2010);
