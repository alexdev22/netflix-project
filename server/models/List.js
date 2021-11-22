const  mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: {type: String, required: true, unique},
    type: {type: String, required: true, unique},
    genre: {type: String},
    content: {type: Array},
}, {timestamps})

module.exports = mongoose.model("List", listSchema)