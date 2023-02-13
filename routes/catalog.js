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
router.post('/title', title_controller.post_title)

//GET request for a single title
router.get("/title/:id", title_controller.title_detail)

//GET all books
router.get("/titles", title_controller.title_list)

router.post("/director", director_controller.post_director)

//GET a single director
router.get("/director/:id", director_controller.director_detail)

//GET all directors
router.get("/directors", director_controller.director_list)

//POST request for a genre
router.post("/genre", genre_controller.post_genre)

//GET request for a single genre
router.get("/genre/:id", genre_controller.genre_detail)

//GET request for a list of all genres
router.get("/genres", genre_controller.genre_list)

//Post request for a language
router.post("/language", language_controller.post_language)

//GET a single language
router.get("/language/:id", language_controller.language_detail)

//GET a list of all languages
router.get("/languages", language_controller.language_list)

module.exports = router;