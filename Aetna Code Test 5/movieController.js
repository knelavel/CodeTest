const { PAGE_LIMIT } = require("../config/constants");
const movieService = require("../services/movieService");
const { formatBudget } = require("../utils/helpers");
const logger = require("../utils/logger");

exports.getAllMovies = async (req, res) => {
  try {
    const { page } = req;
    const result = await movieService.getAllMovies(page);

    if (result.error) {
      logger.warn(`Movies not found: ${result.error}`);
      return res.status(404).json({ error: result.error });
    }

    res.json({
      movies: result.movies.map(movie => ({
        ...movie.toJSON(),
        budget: formatBudget(movie.budget),
      })),
      page,
      totalPages: Math.ceil(result.totalMovies / PAGE_LIMIT),
    });
  } catch (error) {
    logger.error(`Error fetching all movies: ${error.message}`);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    const { movieId } = req;
    const result = await movieService.getMovieDetails(movieId);

    if (result.error) {
      logger.warn(`Movie details not found: ${result.error}`);
      return res.status(404).json({ error: result.error });
    }

    const { movie, avgRating } = result;

    res.json({
      imdbId: movie.imdbId,
      title: movie.title,
      description: movie.overview || "No description available",
      releaseDate: movie.releaseDate || "Unknown",
      budget: formatBudget(movie.budget || 0),
      runtime: movie.runtime || "Unknown",
      averageRating: parseFloat(avgRating.toFixed(2)) || "N/A",
      genres: movie.genres || "Unknown",
      originalLanguage: movie.language || "Unknown",
      productionCompanies: movie.productionCompanies || "Unknown"
    });
  } catch (error) {
    logger.error(`Error fetching movie details: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getMoviesByYear = async (req, res) => {
  try {
    const { year, page, sort = "ASC" } = req;
    const result = await movieService.getMoviesByYear(year, page, sort.toUpperCase());
    res.json({ page, year, movies: result.movies });
  } catch (error) {
    logger.error(`Error fetching movies by year: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getMoviesByGenre = async (req, res) => {
  try {
    const { genre, page } = req;
    const result = await movieService.getMoviesByGenre(genre, page);
    res.json({ movies: result.movies, page, limit: PAGE_LIMIT });
  } catch (error) {
    logger.error(`Error fetching movies by genre: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};