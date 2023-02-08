const Title = require('../models/title')
const Director = require('../models/director')
const Genre = require('../models/genre')
const Language = require('../models/language')
const async = require('async')
const title = require('../models/title')


//Displays an index page featuring counts of the various categories
exports.index = (req, res) => {
    async.parallel (
        {
            title_count(callback) {
                Title.countDocuments({}, callback)
            },
            director_count(callback) {
                Director.countDocuments({}, callback)
            },
            genre_count(callback) {
                Genre.countDocuments({}, callback)
            },
            language_count(callback) {
                Language.countDocuments({}, callback)
            },
        },
        (err, results) => {
            res.json("index", {
                title: "Blu-Ray Library",
                error: err,
                data: results
            })
        }
    )
}

//Display a list of all titles
exports.title_list = function(req, res, next) {
    Title.find({}, "title director")
        .sort({title: 1})
        .populate("director")
        .exec(function (err, list_titles) {
            if (err) {
                return next(err)
            }
            res.json("title_list", {
                title: "Title List",
                title_list: list_titles
            })
        })
}

//Display a detail page for a specific title
exports.title_detail = function(req, res, next) {
    async.parallel (
        {
            title(callback) {
                title.findById(req.params.id)
                    .populate("director")
                    .populate("genre")
                    .populate("year")
                    .exec(callback)
            }
        },
        (err, results) => {
            if (err) {
                return next(err)
            }
            if (results.title == null) {
                const err = new Error("Title not found")
                err.status = 404
                return next(err)
            }
            res.json("title_detail", {
                title_name: results.title.title,
                title: results.title,
            })
        }
    )
}