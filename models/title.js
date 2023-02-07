const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TitleSchema = new Schema({
    title: {type: String, required: true},
    director: {type: Schema.Types.ObjectId, ref: "Director", required: true},
    summary: {type: String, required: true},
    year: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: "Genre"}],
    language: [{type: Schema.Types.ObjectId, ref: "Language"}]
})

module.exports = mongoose.model("Title", TitleSchema)