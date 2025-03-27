exports.validatePageParam = (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    if (page < 1) return res.status(400).json({ error: "Invalid page number" });
    req.page = page;
    next();
};

exports.validateMovieId = (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id) || parseInt(id) <= 0) return res.status(400).json({ error: "Invalid movie ID" });
    req.movieId = parseInt(id);
    next();
};

exports.validateYear = (req, res, next) => {
    const { year } = req.query;
    if (!year || isNaN(year) || year.length !== 4) return res.status(400).json({ error: "Invalid year format" });
    req.year = year;
    next();
};

exports.validateGenre = (req, res, next) => {
    const { genre } = req.query;
    if (!genre) return res.status(400).json({ error: "Genre is required" });
    req.genre = genre;
    next();
};
  