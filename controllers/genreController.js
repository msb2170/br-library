const Genre = require('../models/genre')
const Title = require('../models/title')
const async = require('async')

//Display a list of all genres
exports.genre_list = function(req, res, next) {
    Genre.find({})
    .sort([["name", "ascending"]])
    .exec(function (err, list_genres) {
        if (err) {
            return next(err)
        }
        res.json({
            title: "Genre List",
            genre_list: list_genres
        })
    })
}

//Display a detail page for a specific genre
exports.genre_detail = function(req, res, next) {
    async.parallel(
        {
            genre(callback) {
                Genre.findById(req.params.id).exec(callback)
            },

            genre_titles(callback) {
                Title.find({genre: req.params.id}).exec(callback)
            },
        },
        (err, results) => {
            if (err) {
                return next(err)
            }
            if(results.genre == null) {
                const err = new Error("Genre not Found")
                err.status = 404
                return next(err)
            }
            res.json("genre_detail", {
                title: "Genre Detail",
                genre: results.genre,
                genre_titles: results.genre_titles
            })
        }
    )
}

//Post a genre
exports.post_genre = function(req,res) {
    let genre = new Genre({
        name: req.body.name
    })
    genre.save((err, db) => {
        if (err) return err
        res.json(db)
    })
}