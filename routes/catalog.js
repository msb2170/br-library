const express = require('express')

const router = express.Router();

//require controllers
const title_controller = require('../controllers/titleController')

//GET data from the API upon search
router.get("/search", title_controller.search)

//GET home page
router.get("/", title_controller.index)

//POST request for a title
router.post('/title', title_controller.post_title)

//GET request for a single title
router.get("/title/:id", title_controller.title_detail)

//GET all books
router.get("/titles", title_controller.title_list)

//Delete a title
router.delete("/title/:id", title_controller.delete_title)

module.exports = router;