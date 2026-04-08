const movies = require("../models/movies.model");

const getMovies = async (req, res) => {
  try {
    const allMovies = await movies.getAll();
    res.json({ message: `Welcome ${req.user.username} to the Movie API!`, data: allMovies });
  } catch (error) {
    console.error("Error fetching movies", error);
    res.status(500).json({ error: "500: Could not fetch movies", message: "Internal server error" });
  }
};

const getMovieById = async (req, res) => {
  const movieId = Number(req.params.id);

  if (Number.isNaN(movieId) || movieId <= 0) {
    return res.status(400).json({
      error: "400: Invalid movie ID",
      message: "Please provide a valid positive integer for the movie ID in the URL parameter",
    });
  }

  try {
    const movie = await movies.getById(movieId);

    if (!movie) {
      return res.status(404).json({
        error: "404: Movie not found",
        message: `No movie found with ID ${movieId}`,
      });
    }

    res.json({ message: "Movie found", data: movie });
  } catch (error) {
    console.error("Error fetching movie by ID", error);
    res.status(500).json({ error: "500: Could not fetch movie", message: "Internal server error" });
  }
};

const createMovie = async (req, res) => {
  const { title, year } = req.body;

  if (!title || !year) {
    return res.status(400).json({
      error: "400: Title and year are required",
      message: "Please provide both title and year in the request body",
    });
  }


  const yearNum = Number(year);
  if (isNaN(yearNum) || yearNum < 1850 || yearNum > 3000) {
    return res.status(400).json({
      error: "400: Invalid year",
      message: "Year must be a valid number between 1850 and 3000",
    });
  }

  try {
    const newMovie = await movies.create(title.trim(), yearNum);
    res.status(201).json({ message: "Movie created successfully", data: newMovie });
  } catch (error) {
    console.error("Error creating movie", error);
    res.status(500).json({ error: "500: Could not create movie", message: "Internal server error" });
  }
};

const deleteMovie = async (req, res) => {
  const movieId = Number(req.params.id);

  if (Number.isNaN(movieId) || movieId <= 0) {
    return res.status(400).json({
      error: "400: Invalid movie ID",
      message: "Please provide a valid positive integer for the movie ID in the URL parameter",
    });
  }

  try {
    const rowCount = await movies.remove(movieId);

    if (rowCount === 0) {
      return res.status(404).json({
        error: "404: Movie not found",
        message: `No movie found with ID ${movieId}`,
      });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie", error);
    res.status(500).json({ error: "500: Could not delete movie", message: "Internal server error" });
  }
};

const updateMovie = async (req, res) => {
  const movieId = Number(req.params.id);
  const { title, year } = req.body;

  if (Number.isNaN(movieId) || movieId <= 0) {
    return res.status(400).json({
      error: "400: Invalid movie ID",
      message: "Please provide a valid positive integer for the movie ID in the URL parameter",
    });
  }

  if (!title || !year) {
    return res.status(400).json({
      error: "400: Title and year are required",
      message: "Please provide both title and year in the request body",
    });
  }


  const yearNum = Number(year);
  if (isNaN(yearNum) || yearNum < 1850 || yearNum > 3000) {
    return res.status(400).json({
      error: "400: Invalid year",
      message: "Year must be a valid number between 1850 and 3000",
    });
  }

  try {
    const updatedMovie = await movies.update(movieId, title.trim(), yearNum);

    if (!updatedMovie) {
      return res.status(404).json({
        error: "404: Movie not found",
        message: `No movie found with ID ${movieId}`,
      });
    }

    res.json({ message: "Movie updated successfully", data: updatedMovie });
  } catch (error) {
    console.error("Error updating movie", error);
    res.status(500).json({ error: "500: Could not update movie", message: "Internal server error" });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};