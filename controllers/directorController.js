const Director = require('../models/director')
const async = require('async')
const Title = require('../models/title')

//Display list of all directors
exports.director_list = function(req, res, next) {
    Director.find({})
    .sort([["last_name", "ascending"]])
    .exec(function(err, list_directors) {
        if (err) {
            return next(err)
        }
        res.json({
            title: "Director List",
            director_list: list_directors
        })
    })
}

//Display a detail page for a specific author
exports.director_detail = function(req, res, next) {
    async.parallel (
        {
            director(callback) {
                Director.findById(req.params.id).exec(callback)
            },
            director_titles(callback) {
                Title.find({director: req.params.id}, "title summary").exec(callback)
            }
        },
        (err, results) => {
            if (err) {
                return next(err)
            }
            if (results.director == null) {
                const err = new Error("Director not Found")
                err.status = 404
                return next(err)
            }
            res.json("director_detail", {
                title: "Director Detail",
                director: results.director,
                director_titles: results.director_titles
            })
        }
    )
}

exports.post_director = function(req, res) {
    let director = new Director({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    })
    director.save((err, db) => {
        if (err) {
            res.status(500).send(err)
        }
        res.json(db)
    })
}