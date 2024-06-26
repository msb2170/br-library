require("dotenv").config;

const axios = require("axios");

const Title = require("../models/title");
const async = require("async");

//Displays an index page featuring counts of the various categories
exports.index = (req, res) => {
  async.parallel(
    {
      title_count(callback) {
        Title.countDocuments({}, callback);
      },
      director_count(callback) {
        Director.countDocuments({}, callback);
      },
      genre_count(callback) {
        Genre.countDocuments({}, callback);
      },
      language_count(callback) {
        Language.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.json({
        title: "Blu-Ray Library",
        error: err,
        data: results,
      });
    }
  );
};

exports.search = function (req, res, next) {
  const omdbAPIkey = process.env.OMDB_KEY;
  const searchTerm = req.query.query;
  console.log(searchTerm);
  axios
    .get(`http://www.omdbapi.com/?apikey=${omdbAPIkey}&t=${searchTerm}`)
    .then((response) => res.json(response.data));
};

// Display a list of all titles
exports.title_list = function (req, res, next) {
  Title.find({})
    .sort({ _id: -1 })
    .populate("director")
    .exec(function (err, list_titles) {
      if (err) {
        return next(err);
      }
      res.json({
        title_list: list_titles,
      });
    });
};

//Display a detail page for a specific title
exports.title_detail = function (req, res, next) {
  async.parallel(
    {
      title(callback) {
        Title.findById(req.params.id)
          .populate("director")
          .populate("genre")
          .populate("year")
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.title == null) {
        const err = new Error("Title not found");
        err.status = 404;
        return next(err);
      }
      res.json({
        title_name: results.title.title,
        title: results.title,
      });
    }
  );
};

exports.post_title = function (req, res) {
  let title = new Title({
    title: req.body.Title,
    poster: req.body.Poster,
    director: req.body.Director,
    year: req.body.Year,
    genre: req.body.Genre,
    language: req.body.Language,
    summary: req.body.Plot,
  });
  title.save((err, db) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(db);
  });
};

exports.delete_title = function (req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(404).send("No post with that ID");
  }
  Title.findByIdAndRemove(id).exec((err) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ message: "Title deleted" });
  });
};
