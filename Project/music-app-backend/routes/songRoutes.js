const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Lấy tất cả bài hát
router.get('/', songController.getAllSongs);

// Thêm bài hát mới (cần xác thực và quyền quản trị)
router.post('/', auth, admin, songController.addSong);

module.exports = router;
