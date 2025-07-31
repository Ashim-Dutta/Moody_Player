const mongoose = require('mongoose')

const songsSchema = new mongoose.Schema({
    title: String,
    artist: String,
    audio: String,
    mood:String
})

const song = mongoose.model('song', songsSchema)
module.exports = song