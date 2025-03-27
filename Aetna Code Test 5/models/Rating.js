const { DataTypes } = require("sequelize");
const { sequelizeRatings } = require("../config/database");

const Rating = sequelizeRatings.define("Rating", {
  ratingId: { type: DataTypes.INTEGER, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  movieId: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.FLOAT, allowNull: false },
  timestamp: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: false });

module.exports = Rating;