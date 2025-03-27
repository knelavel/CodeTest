const express = require("express");
const movieRoutes = express.Router();
const movieController = require("../controllers/movieController");
const { validatePageParam, validateMovieId, validateYear, validateGenre } = require("../middlewares/validate");

movieRoutes.get("/year", validateYear, validatePageParam, movieController.getMoviesByYear);
movieRoutes.get("/genre", validateGenre, validatePageParam, movieController.getMoviesByGenre);
movieRoutes.get("/:id", validateMovieId, movieController.getMovieDetails);
movieRoutes.get("/", validatePageParam, movieController.getAllMovies);

module.exports = movieRoutes;
