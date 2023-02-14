const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TitleSchema = new Schema({
    title: {type: String, required: true},
    director: {type: Schema.ObjectId, ref: "Director"},
    summary: {type: String, required: true},
    year: {type: String, required: true},
    genre: [{type: Schema.ObjectId, ref: "Genre"}],
    language: [{type: Schema.ObjectId, ref: "Language"}]
})

module.exports = mongoose.model("Title", TitleSchema)