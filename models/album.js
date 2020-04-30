const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    artist: {type: String, required: true},
    genre: {type: String, },
    year: {type: Number, required: true}
});

module.exports = mongoose.model('Album', albumSchema);