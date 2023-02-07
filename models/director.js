const mongoose = require("mongoose")

const Schema = mongoose.Schema

const DirectorSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
});

DirectorSchema.virtual("name").get(function() {
    let fullName = '';
    if (this.first_name && this.last_name) {
        fullName = `${this.first_name} ${this.last_name}`
    }
    if (!this.first_name || !this.last_name) {
        fullName = '';
    }
    return fullName
})

DirectorSchema.virtual("url").get(function() {
    return `/catalog/director/${this._id}`
})

module.exports = mongoose.model("Director", DirectorSchema)
