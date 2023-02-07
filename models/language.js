const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LanguageSchema = new Schema({
    name: {type: String, required: true}
})

LanguageSchema.virtual("url").get(function() {
    return `/catalog/genre/${this._id}`
})

module.exports = mongoose.model("Language", LanguageSchema)