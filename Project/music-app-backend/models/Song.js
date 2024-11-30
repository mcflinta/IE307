// const mongoose = require('mongoose');

// const SongSchema = new mongoose.Schema({
//   title: String,
//   artist: String,
//   url: String,
//   artwork: String,
// });

// module.exports = mongoose.model('Song', SongSchema);

const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
});

module.exports = mongoose.model('Song', SongSchema);
