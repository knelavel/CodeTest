const { Sequelize } = require("sequelize");

const sequelizeMovies = new Sequelize({
  dialect: "sqlite",
  storage: "./db/movies.db",
  logging: false,
});

const sequelizeRatings = new Sequelize({
  dialect: "sqlite",
  storage: "./db/ratings.db",
  logging: false,
});

module.exports = { sequelizeMovies, sequelizeRatings };