const { PAGE_LIMIT } = require("../config/constants");
const { Op, Sequelize } = require("sequelize");
const Movie = require("../models/Movie");
const Rating = require("../models/Rating");
const logger = require("../utils/logger");

const getAllMovies = async (page) => {
  try {
    logger.info(`Fetching all movies for page: ${page}`);
    const offset = (page - 1) * PAGE_LIMIT;
    const totalMovies = await Movie.count();

    if (offset >= totalMovies) {
      logger.warn("No more movies available");
      return { error: "No more movies available" };
    }

    const movies = await Movie.findAll({
      attributes: ["movieId", "imdbId", "title", "genres", "releaseDate", "budget"],
      limit: PAGE_LIMIT,
      offset,
    });

    return { movies, totalMovies };
  } catch (error) {
    logger.error(`Error fetching all movies: ${error.message}`);
    throw error;
  }
};

const getMovieDetails = async (id) => {
  try {
    logger.info(`Fetching details for movie ID: ${id}`);
    const movie = await Movie.findOne({
      where: { movieId: id },
      attributes: [
        "imdbId", "title", "overview", "releaseDate", "budget",
        "runtime", "language", "genres", "productionCompanies"
      ],
    });

    if (!movie) {
      logger.warn("Movie not found");
      return { error: "Movie not found" };
    }

    const averageRating = await Rating.findOne({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "avgRating"]],
      where: { movieId: id },
      raw: true,
    });

    return { movie, avgRating: averageRating.avgRating || "N/A" };
  } catch (error) {
    logger.error(`Error fetching movie details: ${error.message}`);
    throw error;
  }
};

const getMoviesByYear = async (year, page, sort) => {
  try {
    logger.info(`Fetching movies for year: ${year}, page: ${page}, sort: ${sort}`);
    const offset = (page - 1) * PAGE_LIMIT;

    const movies = await Movie.findAll({
      attributes: ["imdbId", "title", "genres", "releaseDate", "budget"],
      where: Sequelize.where(Sequelize.fn("strftime", "%Y", Sequelize.col("releaseDate")), year),
      order: [["releaseDate", sort]],
      limit: PAGE_LIMIT,
      offset,
    });

    return { movies };
  } catch (error) {
    logger.error(`Error fetching movies by year: ${error.message}`);
    throw error;
  }
};

const getMoviesByGenre = async (genre, page) => {
  try {
    logger.info(`Fetching movies for genre: ${genre}, page: ${page}`);
    const offset = (page - 1) * PAGE_LIMIT;

    const movies = await Movie.findAll({
      attributes: ["imdbId", "title", "genres", "releaseDate", "budget"],
      where: { genres: { [Op.like]: `%${genre}%` } },
      limit: PAGE_LIMIT,
      offset,
    });

    return { movies };
  } catch (error) {
    logger.error(`Error fetching movies by genre: ${error.message}`);
    throw error;
  }
};

module.exports = { getAllMovies, getMovieDetails, getMoviesByYear, getMoviesByGenre };
