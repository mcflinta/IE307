const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const auth = require('../middleware/auth');

// Tạo playlist mới
router.post('/', auth, playlistController.createPlaylist);

// Thêm bài hát vào playlist
router.post('/add-song', auth, playlistController.addSongToPlaylist);

// Lấy tất cả playlist của người dùng
router.get('/', auth, playlistController.getUserPlaylists);

module.exports = router;
