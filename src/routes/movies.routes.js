const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { getMovies, getMovieById, createMovie, deleteMovie } = require("../controllers/movies.controller"); 

router.get("/", protect, getMovies);
router.get("/:id", protect, getMovieById);
router.post("/", protect, createMovie);
router.delete("/:id", protect, deleteMovie);

module.exports = router;