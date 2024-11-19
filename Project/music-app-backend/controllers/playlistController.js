const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

// Tạo playlist mới
exports.createPlaylist = async (req, res) => {
  const { name } = req.body;

  try {
    const playlist = new Playlist({
      name,
      user: req.user.id,
    });

    await playlist.save();
    res.json(playlist);
  } catch (error) {
    res.status(500).send('Lỗi máy chủ');
  }
};

// Thêm bài hát vào playlist
exports.addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist không tồn tại' });
    }

    // Kiểm tra quyền sở hữu
    if (playlist.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Không có quyền' });
    }

    // Thêm bài hát
    playlist.songs.push(songId);
    await playlist.save();

    res.json(playlist);
  } catch (error) {
    res.status(500).send('Lỗi máy chủ');
  }
};

// Lấy tất cả playlist của người dùng
exports.getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id }).populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).send('Lỗi máy chủ');
  }
};
