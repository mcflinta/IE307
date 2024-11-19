const Song = require('../models/Song');

// Lấy tất cả bài hát
exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).send('Lỗi máy chủ');
  }
};

// Thêm bài hát mới (dành cho quản trị viên)
exports.addSong = async (req, res) => {
  const { title, artist, url, artwork } = req.body;

  try {
    const song = new Song({
      title,
      artist,
      url,
      artwork,
    });

    await song.save();
    res.json(song);
  } catch (error) {
    res.status(500).send('Lỗi máy chủ');
  }
};
