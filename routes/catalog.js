const express = require('express')

const router = express.Router();

//require controllers
const director_controller = require('../controllers/directorController')
const genre_controller = require('../controllers/genreController')
const language_controller = require('../controllers/languageController')
const title_controller = require('../controllers/titleController')

//GET home page
router.get("/", title_controller.index)

//POST request for a title
router.post('/title', (req, res) => {
    let title = new Title({
        director: req.body.director,
        title: req.body.title,
        language: req.body.language,
        genre: req.body.genre,
        year: req.body.year
    })
    title.save((err, result) => {
        if (err) {
            return res.status(500).json({err})
        }
        res.json({result})
    })
})

//GET request for a single title
router.get("/title/:id", title_controller.title_detail)

//GET all books
router.get("/titles", title_controller.title_list)

//Director CRUD ops

//GET a single director
router.get("/director/:id", director_controller.director_detail)

//GET all directors
router.get("/directors", director_controller.director_list)

//Genre CRUD ops here

//GET request for a single genre
router.get("/genre/:id", genre_controller.genre_detail)

//GET request for a list of all genres
router.get("/genres", genre_controller.genre_list)

//Language CRUD ops here

//GET a single language
router.get("/language/:id", language_controller.language_detail)

//GET a list of all languages
router.get("/languages", language_controller.language_list)

module.exports = router