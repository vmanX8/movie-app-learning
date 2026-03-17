const express = require("express");
const router = express.Router();

const { getMovies, getMovieById, createMovie, deleteMovie } = require("../controllers/movies.controller"); 

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.delete("/:id", deleteMovie);

module.exports = router;