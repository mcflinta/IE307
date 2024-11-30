// server.js
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Song = require('./models/Song'); // Model bài hát
const path = require('path');
const fs = require('fs');
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

app.get('/music/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'music', filename);

    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(`Error finding file: ${filePath}`);
            res.status(404).send('File not found');
            return;
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
});
// app.get('/music/:filename', (req, res) => {
//     const { filename } = req.params;
//     const filePath = path.join(__dirname, 'music', filename);

//     fs.stat(filePath, (err, stats) => {
//         if (err) {
//             console.error(`Error finding file: ${filePath}`);
//             res.status(404).send('File not found');
//             return;
//         }

//         res.setHeader('Content-Length', stats.size);
//         res.setHeader('Content-Type', 'audio/mpeg');

//         const stream = fs.createReadStream(filePath);
//         stream.pipe(res);
//     });
// });


// Khởi động server
const HOST = '192.168.105.35'; // Thay bằng địa chỉ IP bạn muốn
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
