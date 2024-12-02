const mongoose = require('mongoose');

// const PlaylistSchema = new mongoose.Schema({
//   name: String,
//   songs: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Song',
//     },
//   ],
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
// });

// module.exports = mongoose.model('Playlist', PlaylistSchema);

const playlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  songs: [{ type: String }] // Lưu trữ songId từ Spotify
});


module.exports = mongoose.model('Playlist', playlistSchema);