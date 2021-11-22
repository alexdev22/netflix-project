const  mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true, unique},
    description: {type: String, required: true, unique},
    img: {type: String},
    imgTitle: {type: String},
    imgSmall: {type: String},
    trailer: {type: String},
    video: {type: String},
    year: {type: String},
    limit: {type: Number},
    genre: {type: String},
    isSeries: {type: Boolean, default: "false"},

}, {timestamps})

module.exports = mongoose.model("Movie", movieSchema)