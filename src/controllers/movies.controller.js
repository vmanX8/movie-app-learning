const movies = require("../models/movies.model");

const getMovies = (req, res) => {
  res.json({ message: "Welcome to the Movie API!", data: movies });
};

const getMovieById  = (req, res) => {
  const movieId = Number(req.params.id);
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    return res.status(404).json({ error: "404: Movie not found" });
  }
  
  res.json({ message: "Movie found", data: movie });
};

const createMovie = (req, res) => {
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

  res.status(201).json({ message: "Movie created successfully", data: newMovie });
};

const deleteMovie = (req, res) => {
    const movieId = Number(req.params.id);
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) {
    return res.status(404).json({ error: "404: Movie not found" });
  }

    movies.splice(movieIndex, 1);
    res.json({ message: "Movie deleted successfully" });
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  deleteMovie
};