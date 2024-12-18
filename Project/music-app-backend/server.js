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
const SearchHistory = require('./models/SearchHistory');
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
        const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name, }, SECRET_KEY, { expiresIn: '7d' });

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
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name}, SECRET_KEY, { expiresIn: '7d' }); // Token có hạn 7 ngày
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
// app.get('/api/verify-token', authenticateToken, (req, res) => {
//     // console.log('User:', req);

//     res.status(200).json({ user: req.user });
// });
app.get('/api/verify-token', authenticateToken, async (req, res) => {
    try {
        // Truy vấn thông tin người dùng từ MongoDB
        const user = await User.findById(req.user.id).select('name email'); // Chỉ lấy 'name' và 'email'

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Trả về thông tin user bao gồm 'name'
        res.status(200).json({
            user: {
                id: req.user.id,
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
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

// app.get('/music/by-id/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         // 1. Kiểm tra trong MongoDB
//         let song = await Song.findOne({ id });

//         if (!song) {
//             console.log(`Song with ID ${id} not found in the database. Fetching from Spotify...`);

//             // 2. Tìm bài hát từ Spotify API
//             const spotifySong = await fetchSongFromSpotify(id);

//             if (!spotifySong) {
//                 return res.status(404).send('Song not found in database or on Spotify.');
//             }

//             // 3. Trả về phản hồi "Processing" ngay lập tức
//             res.status(202).json({
//                 message: 'Song is being downloaded. Please try again later.',
//                 id: spotifySong.id,
//                 name: spotifySong.name,
//                 external_urls: spotifySong.external_urls,
//             });

//             // 4. Xử lý tải nhạc từ Spotify trong nền
//             const downloadPath = path.join(__dirname, 'music');
//             const spotdlCommand = `spotdl --cookie cookies.txt "${spotifySong.external_urls}" --output "${downloadPath}"`;

//             console.log(`Downloading song from Spotify: ${spotifySong.name}`);
//             const { stdout, stderr } = await execPromise(spotdlCommand);

//             if (stderr) {
//                 console.error(`Error downloading song: ${stderr}`);
//                 return;
//             }

//             console.log(`Download completed: ${stdout}`);

//             // 5. Lấy file mới tải về
//             const downloadedFiles = fs.readdirSync(downloadPath)
//                 .map(file => ({
//                     name: file,
//                     time: fs.statSync(path.join(downloadPath, file)).mtime.getTime(),
//                 }))
//                 .sort((a, b) => b.time - a.time); // Sắp xếp theo thời gian chỉnh sửa

//             if (downloadedFiles.length === 0) {
//                 console.error('No file downloaded.');
//                 return;
//             }

//             const downloadedFile = downloadedFiles[0].name; // File mới nhất
//             const oldFilePath = path.join(downloadPath, downloadedFile);

//             // 6. Đổi tên file
//             const newFileName = `${spotifySong.name.replace(/[<>:"/\\|?*]/g, '')}.mp3`; // Xử lý tên file
//             const newFilePath = path.join(downloadPath, newFileName);

//             fs.renameSync(oldFilePath, newFilePath);
//             console.log(`Renamed file to: ${newFileName}`);

//             // 7. Lưu bài hát vào MongoDB
//             const newSong = new Song({
//                 id: spotifySong.id,
//                 name: spotifySong.name,
//                 path: path.join('music', newFileName), // Đường dẫn file
//             });

//             await newSong.save();

//             console.log(`Song ${spotifySong.name} added to the database.`);
//             return;
//         }

//         // 8. Nếu bài hát đã có, trả về file
//         const filePath = path.join(__dirname, song.path);
//         serveFile(filePath, req, res);

//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal server error.');
//     }
// });

app.get('/music/by-id/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // 1. Kiểm tra trong MongoDB
        let song = await Song.findOne({ id });

        if (!song) {
            console.log(`Song with ID ${id} not found in the database. Checking local folder...`);

            // 2. Quét thư mục `music` để tìm bài hát
            const musicPath = path.join(__dirname, 'music');
            const files = fs.readdirSync(musicPath);

            const matchedFile = files.find(file => file.includes(id));

            if (matchedFile) {
                console.log(`Found song with ID ${id} in the local folder: ${matchedFile}`);

                // 3. Thêm bài hát vào MongoDB
                const newSong = new Song({
                    id: id,
                    name: path.basename(matchedFile, '.mp3'), // Loại bỏ phần mở rộng
                    path: path.join('music', matchedFile),
                });

                await newSong.save();
                console.log(`Song ${matchedFile} added to the database.`);

                // 4. Tiếp tục xử lý như khi bài hát đã tồn tại trong database
                song = newSong;
            } else {
                console.log(`Song with ID ${id} not found in the local folder. Fetching from Spotify...`);

                // Tiếp tục với logic tải bài hát từ Spotify như trong đoạn mã gốc
                const spotifySong = await fetchSongFromSpotify(id);

                if (!spotifySong) {
                    return res.status(404).send('Song not found in database, local folder, or on Spotify.');
                }

                res.status(202).json({
                    message: 'Song is being downloaded. Please try again later.',
                    id: spotifySong.id,
                    name: spotifySong.name,
                    external_urls: spotifySong.external_urls,
                });

                // Tải nhạc từ Spotify
                const downloadPath = path.join(__dirname, 'music');
                const spotdlCommand = `spotdl "${spotifySong.external_urls}" --output "${downloadPath}"`;

                console.log(`Downloading song from Spotify: ${spotifySong.name}`);
                const { stdout, stderr } = await execPromise(spotdlCommand);

                if (stderr) {
                    console.error(`Error downloading song: ${stderr}`);
                    return;
                }

                console.log(`Download completed: ${stdout}`);

                const downloadedFiles = fs.readdirSync(downloadPath)
                    .map(file => ({
                        name: file,
                        time: fs.statSync(path.join(downloadPath, file)).mtime.getTime(),
                    }))
                    .sort((a, b) => b.time - a.time);

                if (downloadedFiles.length === 0) {
                    console.error('No file downloaded.');
                    return;
                }

                const downloadedFile = downloadedFiles[0].name;
                const oldFilePath = path.join(downloadPath, downloadedFile);

                const newFileName = `${spotifySong.name.replace(/[<>:"/\\|?*]/g, '')}.mp3`;
                const newFilePath = path.join(downloadPath, newFileName);

                fs.renameSync(oldFilePath, newFilePath);
                console.log(`Renamed file to: ${newFileName}`);

                const newSpotifySong = new Song({
                    id: spotifySong.id,
                    name: spotifySong.name,
                    path: path.join('music', newFileName),
                });

                await newSpotifySong.save();

                console.log(`Song ${spotifySong.name} added to the database.`);
                return;
            }
        }

        // 5. Nếu bài hát đã có (hoặc vừa được thêm vào từ thư mục), trả về file
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

let tracksData = [];
fs.readFile('./data/topTrack.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        tracksData = JSON.parse(data);
    }
});

// Endpoint truy vấn top tracks theo `id`

// app.get('/artist/toptrack/:id', authenticateToken, (req, res) => {
//     const { id } = req.params;

//     // Lọc các bài hát có `id` khớp với tham số
//     const topTracks = tracksData.filter(track => track.id === id);

//     if (topTracks.length === 0) {
//         return res.status(404).json({ message: `Không tìm thấy bài hát nào với id: ${id}` });
//     }

//     // Trả về danh sách bài hát
//     res.json(topTracks);
// });
app.get('/artist/toptrack/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    if (!Array.isArray(tracksData)) {
        return res.status(500).json({ message: 'Dữ liệu không hợp lệ.' });
    }

    // Duyệt qua tất cả mảng con trong tracksData
    const topTracks = tracksData.flatMap(tracks => 
        tracks.filter(track => track.id === id)
    );

    if (topTracks.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy bài hát nào với id: ${id}` });
    }

    // Trả về danh sách bài hát
    res.json(topTracks);
});

// let albumsData;
// fs.readFile('./data/popularAlbumReleases.json', 'utf-8', (err, data) => {
//     if (err) {
//         console.error('Không thể đọc file JSON:', err);
//     } else {
//         albumsData = JSON.parse(data);
//     }
// });

// // Endpoint: Lấy thông tin popularReleaseAlbums của nghệ sĩ theo id
// app.get('/artist/popularAlbumRelease/:id', authenticateToken, (req, res) => {
//     const { id } = req.params;

//     // Kiểm tra dữ liệu đã được tải lên
//     if (!albumsData) {
//         return res.status(500).json({ message: 'Dữ liệu chưa sẵn sàng.' });
//     }

//     // Kiểm tra ID có khớp với artist_id trong dữ liệu
//     if (albumsData.artist_id !== id) {
//         return res.status(404).json({ message: `Không tìm thấy nghệ sĩ với id: ${id}` });
//     }

//     // Trả về danh sách popularReleaseAlbums
//     const popularReleaseAlbums = albumsData.popularReleaseAlbums;
//     if (!popularReleaseAlbums || popularReleaseAlbums.length === 0) {
//         return res.status(404).json({ message: 'Không có album phổ biến nào.' });
//     }
//     const latestReleaseAlbums = albumsData.latest;
//     if (!latestReleaseAlbums || latestReleaseAlbums.length === 0) {
//         return res.status(404).json({ message: 'Không có album lastest nào.' });
//     }
//     res.json({
//         artist_id: albumsData.artist_id,
//         artist_name: albumsData.artist_name,
//         popularReleaseAlbums: popularReleaseAlbums,
//         latest: latestReleaseAlbums,
//     });
// });
let albumsData = [];

// Đọc file JSON khi server khởi động
fs.readFile('./data/popularAlbumReleases.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            albumsData = JSON.parse(data);
            console.log('Dữ liệu album đã được tải.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});
app.get('/artist/popularAlbumRelease/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    // Kiểm tra dữ liệu đã được tải lên
    if (!Array.isArray(albumsData)) {
        return res.status(500).json({ message: 'Dữ liệu chưa sẵn sàng hoặc không hợp lệ.' });
    }

    // Tìm nghệ sĩ có artist_id khớp với id
    const artistData = albumsData.find(artist => artist.artist_id === id);

    if (!artistData) {
        return res.status(404).json({ message: `Không tìm thấy nghệ sĩ với id: ${id}` });
    }

    // Kiểm tra dữ liệu popularReleaseAlbums và latest
    const { popularReleaseAlbums, latest } = artistData;

    if (!popularReleaseAlbums || popularReleaseAlbums.length === 0) {
        return res.status(404).json({ message: 'Không có album phổ biến nào.' });
    }

    if (!latest) {
        return res.status(404).json({ message: 'Không có album mới nhất nào.' });
    }

    // Trả về dữ liệu album
    res.json({
        artist_id: artistData.artist_id,
        artist_name: artistData.artist_name,
        popularReleaseAlbums,
        latest,
    });
});

let artistData;

// Đọc file JSON khi server khởi động
fs.readFile('./data/artistInfo.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        artistData = JSON.parse(data);
        console.log('Dữ liệu nghệ sĩ đã được tải.');
    }
});

// Endpoint lấy thông tin nghệ sĩ theo id
// app.get('/artist/artistInfo/:id', authenticateToken, (req, res) => {
//     const { id } = req.params;

//     // Kiểm tra nếu `artistData` chưa được tải
//     if (!artistData) {
//         return res.status(500).json({ message: 'Dữ liệu chưa sẵn sàng.' });
//     }

//     // Kiểm tra nếu ID khớp
//     if (artistData.id !== id) {
//         return res.status(404).json({ message: `Không tìm thấy thông tin nghệ sĩ nào với id: ${id}` });
//     }

//     // Trả về thông tin nghệ sĩ
//     res.json(artistData);
// });
// Endpoint lấy thông tin nghệ sĩ theo id
app.get('/artist/artistInfo/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    // Kiểm tra nếu `artistData` chưa được tải
    if (!Array.isArray(artistData)) {
        return res.status(500).json({ message: 'Dữ liệu chưa sẵn sàng hoặc không hợp lệ.' });
    }

    // Tìm nghệ sĩ có id khớp
    const artist = artistData.find(artist => artist.id === id);

    if (!artist) {
        return res.status(404).json({ message: `Không tìm thấy thông tin nghệ sĩ nào với id: ${id}` });
    }

    // Trả về thông tin nghệ sĩ
    res.json(artist);
});
// let playlistData;

// // Đọc file JSON khi server khởi động
// fs.readFile('./data/artistPlaylists.json', 'utf-8', (err, data) => {
//     if (err) {
//         console.error('Không thể đọc file JSON:', err);
//     } else {
//         playlistData = JSON.parse(data);
//         console.log('Dữ liệu playlist đã được tải.');
//     }
// });
// // Endpoint lấy danh sách playlist theo artist_id
// app.get('/artist/artistPlaylists/:id', authenticateToken, (req, res) => {
//     const { id } = req.params;

//     // Kiểm tra nếu dữ liệu chưa được tải
//     if (!playlistData) {
//         return res.status(500).json({ message: 'Dữ liệu chưa sẵn sàng.' });
//     }

//     // So khớp `artist_id`
//     if (playlistData.artist_id !== id) {
//         return res.status(404).json({ message: `Không tìm thấy playlist nào với artist_id: ${id}` });
//     }

//     // Trả về danh sách playlist
//     res.json(playlistData.playlists);
// });
let playlistData = [];

// Đọc file JSON khi server khởi động
fs.readFile('./data/artistPlaylists.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            playlistData = JSON.parse(data);
            console.log('Dữ liệu playlist đã được tải.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});

// Endpoint lấy danh sách playlist theo artist_id
app.get('/artist/artistPlaylists/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    // Kiểm tra nếu dữ liệu chưa được tải
    if (!Array.isArray(playlistData)) {
        return res.status(500).json({ message: 'Dữ liệu chưa sẵn sàng hoặc không hợp lệ.' });
    }

    // Tìm nghệ sĩ có `artist_id` khớp với `id`
    const artistPlaylists = playlistData.find(artist => artist.artist_id === id);

    if (!artistPlaylists) {
        return res.status(404).json({ message: `Không tìm thấy playlist nào với artist_id: ${id}` });
    }

    // Trả về danh sách playlist
    res.json(artistPlaylists.playlists);
});


let relatedArtistsData = [];

// Đọc file JSON khi server khởi động
fs.readFile('./data/artistRelated.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            relatedArtistsData = JSON.parse(data);
            console.log('Dữ liệu nghệ sĩ liên quan đã được tải.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});

// Endpoint lấy danh sách nghệ sĩ liên quan theo artist_id
app.get('/artist/relatedArtists/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    // Kiểm tra nếu dữ liệu chưa được tải
    if (!Array.isArray(relatedArtistsData)) {
        return res.status(500).json({ message: 'Dữ liệu chưa sẵn sàng hoặc không hợp lệ.' });
    }

    // Tìm nghệ sĩ có artist_id khớp với id
    const artistData = relatedArtistsData.find(artist => artist.artist_id === id);

    if (!artistData) {
        return res.status(404).json({ message: `Không tìm thấy nghệ sĩ liên quan nào với artist_id: ${id}` });
    }

    // Trả về danh sách nghệ sĩ liên quan
    res.json(artistData.related_artists);
});

let albumsDataArtist = [];

// Đọc dữ liệu từ file JSON khi server khởi động
fs.readFile('./data/albums.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            albumsDataArtist = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});

// Endpoint tìm kiếm album dựa trên artistID và albumID
app.get('/search/album/:artistId/:albumId', (req, res) => {
    const { artistId, albumId } = req.params;

    // Kiểm tra nếu dữ liệu chưa được tải thành công
    if (!Array.isArray(albumsDataArtist) || albumsDataArtist.length === 0) {
        return res.status(500).json({ message: 'Dữ liệu chưa sẵn sàng hoặc không hợp lệ.' });
    }

    // Tìm album khớp với artistID và albumID
    const matchedAlbum = albumsDataArtist.find(album => 
        album.artistID === artistId && album.albumID === albumId
    );

    // Trả về kết quả nếu tìm thấy hoặc thông báo lỗi
    if (!matchedAlbum) {
        return res.status(404).json({ 
            message: `Không tìm thấy album với artistID: ${artistId} và albumID: ${albumId}` 
        });
    }

    res.json(matchedAlbum);
});

let dailyMix = []
fs.readFile('./data/dailyMix.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            dailyMix = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});
app.get('/dailyMix', (req, res) => {
    res.json(dailyMix);
});

let topMix = []
fs.readFile('./data/topMix.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            topMix = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});
app.get('/topMix', (req, res) => {
    res.json(topMix);
});

let radioPlaylist = []
fs.readFile('./data/radioPlaylist.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            radioPlaylist = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});
app.get('/radioPlaylist', (req, res) => {
    res.json(radioPlaylist);
});
let turnOffPlaylist = []
fs.readFile('./data/turnOffPlaylist.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            turnOffPlaylist = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});
app.get('/turnOffPlaylist', (req, res) => {
    res.json(turnOffPlaylist);
});

let recommendStation = []
fs.readFile('./data/recommendStation.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            recommendStation = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});
app.get('/recommendStation', (req, res) => {
    res.json(recommendStation);
});

let bestOfArtist = []
fs.readFile('./data/bestOfArtist.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            bestOfArtist = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});
app.get('/bestOfArtist', (req, res) => {
    res.json(bestOfArtist);
});

let wrappedAlbum = []
fs.readFile('./data/wrappedAlbum.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            wrappedAlbum = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});

app.get('/wrappedAlbum', (req, res) => {
    res.json(wrappedAlbum);
});

let topArtistTrack2024 = []
fs.readFile('./data/topArtistTrack2024.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            topArtistTrack2024 = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});

app.get('/topArtistTrack2024', (req, res) => {
    res.json(topArtistTrack2024);
});

let theBest2024 = []
fs.readFile('./data/theBest2024.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            theBest2024 = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});

app.get('/theBest2024', (req, res) => {
    res.json(theBest2024);
});

let loopBack2024 = []
fs.readFile('./data/loopBack2024.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            loopBack2024 = JSON.parse(data);
            console.log('Dữ liệu album đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});

app.get('/loopBack2024', (req, res) => {
    res.json(loopBack2024);
});
// Biến lưu trữ dữ liệu playlist
let dailyMixDetail = [];

// Đọc file JSON
fs.readFile('./data/dailyMixDetail.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            dailyMixDetail = JSON.parse(data);
            console.log('Dữ liệu playlist đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});

// Endpoint: Lấy thông tin playlist theo ID
app.get('/dailyMixDetail/:id', (req, res) => {
    const { id } = req.params;

    // Tìm playlist khớp với ID từ file JSON
    const matchedPlaylist = dailyMixDetail.find(playlist => 
        playlist.playlist_info.id === id
    );

    // Trả về kết quả nếu tìm thấy hoặc báo lỗi
    if (!matchedPlaylist) {
        return res.status(404).json({ 
            message: `Không tìm thấy playlist với ID: ${id}` 
        });
    }

    res.json(matchedPlaylist);
});

let wrappedAlbumDetail = [];

// Đọc file JSON
fs.readFile('./data/wrappedAlbumDetail.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            wrappedAlbumDetail = JSON.parse(data);
            console.log('Dữ liệu playlist đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});

// Endpoint: Lấy thông tin playlist theo ID
app.get('/wrappedAlbumDetail/:id', (req, res) => {
    const { id } = req.params;

    // Tìm playlist khớp với ID từ file JSON
    const matchedPlaylist = wrappedAlbumDetail.find(playlist => 
        playlist.playlist_info.id === id
    );

    // Trả về kết quả nếu tìm thấy hoặc báo lỗi
    if (!matchedPlaylist) {
        return res.status(404).json({ 
            message: `Không tìm thấy playlist với ID: ${id}` 
        });
    }

    res.json(matchedPlaylist);
});

let topMixDetail = [];

// Đọc file JSON
fs.readFile('./data/topMixDetail.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Không thể đọc file JSON:', err);
    } else {
        try {
            wrappedAlbumDetail = JSON.parse(data);
            console.log('Dữ liệu playlist đã được tải thành công.');
        } catch (parseError) {
            console.error('Lỗi phân tích cú pháp JSON:', parseError);
        }
    }
});

// Endpoint: Lấy thông tin playlist theo ID
app.get('/topMixDetail/:id', (req, res) => {
    const { id } = req.params;

    // Tìm playlist khớp với ID từ file JSON
    const matchedPlaylist = wrappedAlbumDetail.find(playlist => 
        playlist.playlist_info.id === id
    );

    // Trả về kết quả nếu tìm thấy hoặc báo lỗi
    if (!matchedPlaylist) {
        return res.status(404).json({ 
            message: `Không tìm thấy playlist với ID: ${id}` 
        });
    }

    res.json(matchedPlaylist);
});

// Load dữ liệu track.json vào bộ nhớ khi server khởi động
let tracks = [];

const loadTracks = () => {
  const filePath = './data/tracks.json'
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Lỗi khi đọc file track.json:', err);
      process.exit(1); // Dừng server nếu không thể đọc dữ liệu
    }
    try {
      tracks = JSON.parse(data);
      console.log(`Đã tải thành công ${tracks.length} track từ track.json`);
    } catch (parseError) {
      console.error('Lỗi khi phân tích cú pháp JSON:', parseError);
      process.exit(1);
    }
  });
};

// Gọi hàm loadTracks khi server khởi động
loadTracks();

// Endpoint /search
app.get('/search', (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query là bắt buộc' });
  }

  // Lọc các track có artistName chứa query (không phân biệt hoa/thường)
  const filteredResults = tracks.filter((track) =>
    track.artistName.toLowerCase().includes(query.toLowerCase())
  );

  // Giới hạn kết quả tối đa là 20
  const limitedResults = filteredResults.slice(0, 20);

  return res.json(limitedResults);
});

// POST /search/history - Save a search history item
app.post('/search/history', async (req, res) => {
    const { userId, trackId, trackName, artistName, albumImage } = req.body;
  
    if (!userId || !trackId || !trackName || !artistName || !albumImage) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Sử dụng findOneAndUpdate để kiểm tra trùng và ghi đè
      const updatedHistory = await SearchHistory.findOneAndUpdate(
        { user: userId, trackId }, // Điều kiện: userId và trackId đã tồn tại
        { 
          trackName, 
          artistName, 
          albumImage, 
          timestamp: new Date() // Cập nhật thời gian nếu cần
        },
        { 
          new: true, // Trả về bản ghi đã cập nhật
          upsert: true, // Thêm mới nếu không tìm thấy
          setDefaultsOnInsert: true // Áp dụng default schema nếu thêm mới
        }
      );
  
      res.status(201).json({ message: 'Search history saved successfully.', history: updatedHistory });
    } catch (error) {
      console.error('Error saving search history:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  
  
  // GET /search/history - Get search history for a user
  app.get('/search/history', async (req, res) => {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ message: 'userId is required as a query parameter.' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const history = await SearchHistory.find({ user: userId })
        .sort({ timestamp: -1 })
        .limit(50);
  
      res.status(200).json({ history });
    } catch (error) {
      console.error('Error fetching search history:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  app.delete('/search/history', async (req, res) => {
    const { userId, trackId } = req.body;
    // console.log(req.body)
    if (!userId || !trackId) {
      return res.status(400).json({ message: 'UserId and TrackId are required.' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Xóa một bản ghi cụ thể từ SearchHistory
      const deletedHistory = await SearchHistory.findOneAndDelete({ user: userId, trackId });
  
      if (!deletedHistory) {
        return res.status(404).json({ message: 'History not found.' });
      }
  
      res.status(200).json({ message: 'Search history deleted successfully.', history: deletedHistory });
    } catch (error) {
      console.error('Error deleting search history:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  
// Khởi động server
const HOST = '192.168.105.35'; // Thay bằng địa chỉ IP bạn muốn
// const HOST = '149.28.146.58';
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

