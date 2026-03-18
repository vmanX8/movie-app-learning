const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const movies = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008
  },
  {
    id: 3,
    title: "Inception",
    year: 2010
  },
  {
    id: 4,
    title: "The Prestige",
    year: 2006
  },
  {
    id: 5,
    title: "Batman Begins",
    year: 2005
  },
  {  
 id: 6,
  title: "Dunkirk",
  year: 2017
},
{
  id: 7,
  title: "Tenet",
  year: 2020
},
{
  id: 8,
  title: "Memento",
  year: 2000
},
{
  id: 9,
  title: "Insomnia",
  year: 2002
},
{
  id: 10,
  title: "Following",
  year: 1998
}];     

app.get("/", (req, res) => {
    res.send("Welcome to the Movie API!");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    return res.status(404).json({ error: "404: Movie not found" });
  }
  
  res.json(movie);
});

app.post("/movies", (req, res) => {
  const { title, year } = req.body;
    if (!title || !year) {
    return res.status(400).json({ error: "400: Title and year are required" });
    }

    const lastId = movies.reduce((maxId, movie) => Math.max(maxId, movie.id), 0);

    const newMovie = {
    id: lastId + 1,
    title,
    year
  };
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.delete("/movies/:id", (req, res) => {
    const movieId = Number(req.params.id);
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) {
    return res.status(404).json({ error: "404: Movie not found" });
  }

    movies.splice(movieIndex, 1);
    res.json({ message: "Movie deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});