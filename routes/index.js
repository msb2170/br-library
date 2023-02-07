const express = require('express');

const router = express.Router();

//Redirect to catalog from the home page
router.get('/', (req, res) => {
    res.redirect('/catalog')
})

module.exports = router;