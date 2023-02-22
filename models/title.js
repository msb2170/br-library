const mongoose = require('mongoose')

const Schema = mongoose.Schema



const TitleSchema = new Schema({
    title: {type: String, required: true},
    director: {type: String},
    summary: {type: String, required: true},
    year: {type: String, required: true},
    genre: {type: String, ref: "Genre"},
    language: {type: String, ref: "Language"}
})

module.exports = mongoose.model("Title", TitleSchema)