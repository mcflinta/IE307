const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  playlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist',
    },
  ],
  role: {
    type: String,
    default: 'user', // 'admin' cho quản trị viên
  },
});

module.exports = mongoose.model('User', UserSchema);
