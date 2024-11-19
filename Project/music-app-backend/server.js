require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Kết nối cơ sở dữ liệu
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Phục vụ tệp tĩnh
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/music', express.static(path.join(__dirname, 'public/music')));

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/songs', require('./routes/songRoutes'));
app.use('/playlists', require('./routes/playlistRoutes'));

// Route gốc
app.get('/', (req, res) => {
  res.send('API đang hoạt động');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
