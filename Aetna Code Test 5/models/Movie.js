const { DataTypes } = require("sequelize");
const { sequelizeMovies } = require("../config/database");

const Movie = sequelizeMovies.define("Movie", {
  movieId: { type: DataTypes.INTEGER, primaryKey: true },
  imdbId: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  overview: { type: DataTypes.TEXT },
  productionCompanies: { type: DataTypes.TEXT },
  releaseDate: { type: DataTypes.STRING },
  budget: { type: DataTypes.INTEGER },
  revenue: { type: DataTypes.INTEGER },
  runtime: { type: DataTypes.FLOAT },
  language: { type: DataTypes.STRING },
  genres: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
}, { timestamps: false });

module.exports = Movie;