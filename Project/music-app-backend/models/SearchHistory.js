const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trackId: {
    type: String,
    required: function() {
      return this.Type === 'Song';
    },
  },
  trackName: {
    type: String,
    required: function() {
      return this.Type === 'Song';
    },
  },
  uri: {
    type: String,
    required: function() {
      return this.Type === 'Song';
    },
  },
  albumName: {
    type: String,
    required: function() {
      return this.Type === 'Song';
    },
  },

  colorDark: {
    type: String,
    required: function() {
      return this.Type === 'Song';
    },
  },
  colorLight: {
    type: String,
    required: function() {
      return this.Type === 'Song';
    },
  },
  albumID: {
    type: String,
    required: function() {
      return this.Type === 'Song';
    },
  },
  artistID: {
    type: String,
    required: function() {
      return this.Type === 'Song';
    },
  },
  artistImageUrl: {
    type: String,
    required: function() {
      return this.Type === 'Song';
    },
  },
  albumVideo: {
    type: String,
    required: function() {
      return this.Type === 'Song';
    },
  },

  albumId: {
    type: String,
    required: function() {
      return this.Type === 'Album';
    },
  },
  albumName: {
    type: String,
    required: function() {
      return this.Type === 'Album';
    },
  },
  artistID: {
    type: String,
    required: function() {
      return this.Type === 'Album';
    },
  },
  artistId: {
    type: String,
    required: function() {
      return this.Type === 'Artist';
    },
  },
  artistName: {
    type: String,
    required: true,
  },
  albumImage: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
    enum: ['Song', 'Album', 'Artist'], 
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);
