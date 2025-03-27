const express = require("express");
const cors = require("cors");
const { sequelizeMovies, sequelizeRatings } = require("./config/database");
const movieRoutes = require("./routes/movieRoutes");
const { PORT } = require("./config/constants");
const logger = require("./utils/logger");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/movies", movieRoutes);

app.listen(PORT, async () => {
  try {
    await sequelizeMovies.authenticate();
    await sequelizeRatings.authenticate();
    logger.info(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
  }
});
