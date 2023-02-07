const Language = require('../models/language')
const Title = require('../models/title')
const async = require('async')


//Display a list of all genres
exports.language_list = function(req, res, next) {
    Language.find()
    .sort(["name", "ascending"])
    .exec(function (err, list_languages) {
        if (err) {
            return next(err)
        }
        res.json("language list", {
            title: "Language List",
            language_list: list_languages
        })
    })
}

//Display a detail page for a specific genre
exports.language_detail = function(req, res, next) {
    async.parallel(
        {
            genre(callback) {
                Language.findById(req.params.id).exec(callback)
            },

            genre_titles(callback) {
                Title.find({language: req.params.id}).exec(callback)
            },
        },
        (err, results) => {
            if (err) {
                return next(err)
            }
            if(results.genre == null) {
                const err = new Error("Language not Found")
                err.status = 404
                return next(err)
            }
            res.json("language_detail", {
                title: "Language Detail",
                language: results.language,
                language_titles: results.language_titles
            })
        }
    )
}