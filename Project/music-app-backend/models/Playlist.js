const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  name: String,
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
