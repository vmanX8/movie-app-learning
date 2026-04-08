const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require("../controllers/movies.controller"); 

router.get("/", protect, getMovies);
router.get("/:id", protect, getMovieById);
router.post("/", protect, createMovie);
router.put("/:id", protect, updateMovie);
router.delete("/:id", protect, deleteMovie);

module.exports = router;