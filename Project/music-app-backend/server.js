// server.js
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Song = require('./models/Song'); // Model bài hát
const Playlist = require('./models/Playlist'); // Model playlist
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec); // Chuyển exec thành Promise
const { fetchSongFromSpotify } = require('./service/spotifyService');
dotenv.config(); // Tải các biến môi trường từ file .env

const app = express();
const SECRET_KEY = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;

// Middleware để xác thực token
const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

// Kiểm tra MONGO_URI đã được tải chưa
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1); // Dừng server nếu MONGO_URI không được định nghĩa
}

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

// Định nghĩa Schema và Model cho User
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    name: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(express.json());
// const createOrGetDefaultPlaylist = async (userId) => {
//     try {
//         // Tìm playlist mặc định
//         let playlist = await Playlist.findOne({ userId, name: 'Liked Songs' });

//         // Nếu chưa có, tạo mới
//         if (!playlist) {
//             playlist = new Playlist({
//                 userId,
//                 name: 'My Liked Songs',
//                 songs: [],
//             });
//             await playlist.save();
//         }

//         return playlist;
//     } catch (error) {
//         console.error('Error creating or fetching default playlist:', error);
//         throw new Error('Failed to create or get default playlist.');
//     }
// };

const createOrGetDefaultPlaylist = async (userId) => {
    try {
        // Tìm playlist mặc định với tên 'My Liked Songs'
        let playlist = await Playlist.findOne({ userId, name: 'My Liked Songs' });

        // Nếu chưa có, tạo mới với cùng tên
        if (!playlist) {
            playlist = new Playlist({
                userId,
                name: 'My Liked Songs',
                songs: [],
            });
            await playlist.save();
        }

        return playlist;
    } catch (error) {
        console.error('Error creating or fetching default playlist:', error);
        throw new Error('Failed to create or get default playlist.');
    }
};

// Endpoint để xử lý đăng ký
app.post('/api/register', async (req, res) => {
    const { email, password, gender, name } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password || !gender || !name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({
            email,
            password: hashedPassword,
            gender,
            name,
        });

        await newUser.save();
        await createOrGetDefaultPlaylist(newUser._id);
        // Tạo token cho người dùng mới
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, SECRET_KEY, { expiresIn: '7d' });

        res.status(201).json({ 
            message: 'Account created successfully.',
            user: { email: newUser.email, name: newUser.name, gender: newUser.gender },
            token // Thêm token vào phản hồi
        });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Endpoint để xử lý đăng nhập
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Tìm người dùng theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '7d' }); // Token có hạn 7 ngày
        // Trả về thành công cùng với token
        res.status(200).json({ 
            message: 'Login successful.', 
            user: { email: user.email, name: user.name, gender: user.gender },
            token // Thêm token vào phản hồi
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Endpoint để xác thực token
app.get('/api/verify-token', authenticateToken, (req, res) => {
    res.status(200).json({ user: req.user });
});



// Trang chủ để kiểm tra server đang chạy
app.get('/', (req, res) => {
    res.send('Signup Server is running.');
});


app.post('/songs', async (req, res) => {
    try {
        const { id, name, path } = req.body;
        const song = new Song({ id, name, path });
        await song.save();
        res.status(201).json(song);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const serveFile = (filePath, req, res) => {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(`File not found: ${filePath}`);
            return res.status(404).send('File not found');
        }

        const range = req.headers.range;
        if (!range) {
            // Nếu không có header Range, trả về toàn bộ tệp
            res.writeHead(200, {
                'Content-Length': stats.size,
                'Content-Type': 'audio/mpeg',
            });
            fs.createReadStream(filePath).pipe(res);
            return;
        }

        const positions = range.replace(/bytes=/, "").split("-");
        const start = parseInt(positions[0], 10);
        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

        // Kiểm tra các giá trị start và end hợp lệ
        if (start >= total || end >= total) {
            res.writeHead(416, {
                'Content-Range': `bytes */${total}`,
            });
            return res.end();
        }

        const chunkSize = (end - start) + 1;
        const stream = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'audio/mpeg',
        });

        stream.pipe(res);
    });
};

app.get('/music/by-id/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // 1. Kiểm tra trong MongoDB
        let song = await Song.findOne({ id });

        if (!song) {
            console.log(`Song with ID ${id} not found in the database. Fetching from Spotify...`);

            // 2. Tìm bài hát từ Spotify API
            const spotifySong = await fetchSongFromSpotify(id);

            if (!spotifySong) {
                return res.status(404).send('Song not found in database or on Spotify.');
            }

            // 3. Trả về phản hồi "Processing" ngay lập tức
            res.status(202).json({
                message: 'Song is being downloaded. Please try again later.',
                id: spotifySong.id,
                name: spotifySong.name,
                external_urls: spotifySong.external_urls,
            });

            // 4. Xử lý tải nhạc từ Spotify trong nền
            const downloadPath = path.join(__dirname, 'music');
            const spotdlCommand = `spotdl --cookie cookies.txt "${spotifySong.external_urls}" --output "${downloadPath}"`;

            console.log(`Downloading song from Spotify: ${spotifySong.name}`);
            const { stdout, stderr } = await execPromise(spotdlCommand);

            if (stderr) {
                console.error(`Error downloading song: ${stderr}`);
                return;
            }

            console.log(`Download completed: ${stdout}`);

            // 5. Lấy file mới tải về
            const downloadedFiles = fs.readdirSync(downloadPath)
                .map(file => ({
                    name: file,
                    time: fs.statSync(path.join(downloadPath, file)).mtime.getTime(),
                }))
                .sort((a, b) => b.time - a.time); // Sắp xếp theo thời gian chỉnh sửa

            if (downloadedFiles.length === 0) {
                console.error('No file downloaded.');
                return;
            }

            const downloadedFile = downloadedFiles[0].name; // File mới nhất
            const oldFilePath = path.join(downloadPath, downloadedFile);

            // 6. Đổi tên file
            const newFileName = `${spotifySong.name.replace(/[<>:"/\\|?*]/g, '')}.mp3`; // Xử lý tên file
            const newFilePath = path.join(downloadPath, newFileName);

            fs.renameSync(oldFilePath, newFilePath);
            console.log(`Renamed file to: ${newFileName}`);

            // 7. Lưu bài hát vào MongoDB
            const newSong = new Song({
                id: spotifySong.id,
                name: spotifySong.name,
                path: path.join('music', newFileName), // Đường dẫn file
            });

            await newSong.save();

            console.log(`Song ${spotifySong.name} added to the database.`);
            return;
        }

        // 8. Nếu bài hát đã có, trả về file
        const filePath = path.join(__dirname, song.path);
        serveFile(filePath, req, res);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error.');
    }
});

// Endpoint: Tạo playlist mới
app.post('/playlists', authenticateToken, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Playlist name is required.' });
    }

    try {
        const newPlaylist = new Playlist({
            userId: req.user.id,
            name,
            songs: []
        });

        await newPlaylist.save();
        res.status(201).json({ message: 'Playlist created successfully.', playlist: newPlaylist });
    } catch (error) {
        console.error('Error creating playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Endpoint: Xóa playlist
app.delete('/playlists/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const playlist = await Playlist.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found or unauthorized.' });
        }

        res.status(200).json({ message: 'Playlist deleted successfully.' });
    } catch (error) {
        console.error('Error deleting playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Endpoint: Xem danh sách playlist của người dùng
app.get('/playlists', authenticateToken, async (req, res) => {
    try {
        const playlists = await Playlist.find({ userId: req.user.id }).populate('songs', 'id name');
        res.status(200).json(playlists);
    } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Endpoint: Thêm bài hát yêu thích vào playlist
app.post('/playlists/:id/songs', authenticateToken, async (req, res) => {
    const { id } = req.params; // Playlist ID
    const { songId } = req.body;

    if (!songId) {
        return res.status(400).json({ message: 'Song ID is required.' });
    }

    try {
        const playlist = await Playlist.findOne({ _id: id, userId: req.user.id });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found or unauthorized.' });
        }

        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ message: 'Song already in playlist.' });
        }

        playlist.songs.push(songId);
        await playlist.save();

        res.status(200).json({ message: 'Song added to playlist.', playlist });
    } catch (error) {
        console.error('Error adding song to playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Endpoint: Xóa bài hát yêu thích khỏi playlist
app.delete('/playlists/:id/songs/:songId', authenticateToken, async (req, res) => {
    const { id, songId } = req.params;

    try {
        const playlist = await Playlist.findOne({ _id: id, userId: req.user.id });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found or unauthorized.' });
        }

        const songIndex = playlist.songs.indexOf(songId);
        if (songIndex === -1) {
            return res.status(404).json({ message: 'Song not found in playlist.' });
        }

        playlist.songs.splice(songIndex, 1);
        await playlist.save();

        res.status(200).json({ message: 'Song removed from playlist.', playlist });
    } catch (error) {
        console.error('Error removing song from playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Endpoint: Xem bài hát yêu thích trong playlist
app.get('/playlists/:id/songs', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const playlist = await Playlist.findOne({ _id: id, userId: req.user.id });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found or unauthorized.' });
        }

        const songs = await Song.find({ id: { $in: playlist.songs } });

        res.status(200).json(songs);
    } catch (error) {
        console.error('Error fetching songs from playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Endpoint: Thêm bài hát vào playlist mặc định

app.post('/playlists/default/songs', authenticateToken, async (req, res) => {
    const { songId } = req.body;

    if (!songId) {
        return res.status(400).json({ message: 'Song ID is required.' });
    }

    try {
        const playlist = await createOrGetDefaultPlaylist(req.user.id);

        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ message: 'Song already in playlist.' });
        }

        playlist.songs.push(songId);
        await playlist.save();

        res.status(200).json({ message: 'Song added to default playlist.', playlist });
    } catch (error) {
        console.error('Error adding song to default playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.delete('/playlists/default/songs/:songId', authenticateToken, async (req, res) => {
    const { songId } = req.params;

    try {
        const playlist = await createOrGetDefaultPlaylist(req.user.id);

        const songIndex = playlist.songs.indexOf(songId);
        if (songIndex === -1) {
            return res.status(404).json({ message: 'Song not found in default playlist.' });
        }

        playlist.songs.splice(songIndex, 1);
        await playlist.save();

        res.status(200).json({ message: 'Song removed from default playlist.', playlist });
    } catch (error) {
        console.error('Error removing song from default playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
app.post('/playlists/default/songs', authenticateToken, async (req, res) => {
    const { songId } = req.body;

    if (!songId) {
        return res.status(400).json({ message: 'Song ID is required.' });
    }

    try {
        const playlist = await createOrGetDefaultPlaylist(req.user.id);

        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ message: 'Song already in playlist.' });
        }

        playlist.songs.push(songId);
        await playlist.save();

        res.status(200).json({ message: 'Song added to default playlist.', playlist });
    } catch (error) {
        console.error('Error adding song to default playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.delete('/playlists/default/songs/:songId', authenticateToken, async (req, res) => {
    const { songId } = req.params;

    try {
        const playlist = await createOrGetDefaultPlaylist(req.user.id);

        const songIndex = playlist.songs.indexOf(songId);
        if (songIndex === -1) {
            return res.status(404).json({ message: 'Song not found in default playlist.' });
        }

        playlist.songs.splice(songIndex, 1);
        await playlist.save();

        res.status(200).json({ message: 'Song removed from default playlist.', playlist });
    } catch (error) {
        console.error('Error removing song from default playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



// Endpoint: Xóa bài hát khỏi playlist mặc định
app.delete('/playlists/default/songs/:songId', authenticateToken, async (req, res) => {
    const { songId } = req.params;

    try {
        // Tìm bài hát theo id (không phải _id)
        const song = await Song.findOne({ id: songId });
        if (!song) {
            return res.status(404).json({ message: 'Song not found.' });
        }

        // Lấy playlist mặc định
        const playlist = await createOrGetDefaultPlaylist(req.user.id);

        // Xóa bài hát nếu tồn tại trong playlist
        const songIndex = playlist.songs.indexOf(songId);
        if (songIndex === -1) {
            return res.status(404).json({ message: 'Song not found in playlist.' });
        }

        playlist.songs.splice(songIndex, 1);
        await playlist.save();

        res.status(200).json({ message: 'Song removed from playlist.', playlist });
    } catch (error) {
        console.error('Error removing song from playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
app.get('/playlists/default/songs', authenticateToken, async (req, res) => {
    try {
        // Lấy playlist mặc định
        const playlist = await createOrGetDefaultPlaylist(req.user.id);

        // Lấy chi tiết bài hát
        const songs = await Song.find({ id: { $in: playlist.songs } });

        res.status(200).json(songs);
    } catch (error) {
        console.error('Error fetching songs from playlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// Khởi động server
// const HOST = '192.168.105.35'; // Thay bằng địa chỉ IP bạn muốn
const HOST = '149.28.146.58';
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

