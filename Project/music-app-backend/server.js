// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const path = require('path');

// const app = express();

// // Kết nối cơ sở dữ liệu
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Phục vụ tệp tĩnh
// app.use('/images', express.static(path.join(__dirname, 'public/images')));
// app.use('/music', express.static(path.join(__dirname, 'public/music')));

// // Routes
// app.use('/users', require('./routes/userRoutes'));
// app.use('/songs', require('./routes/songRoutes'));
// app.use('/playlists', require('./routes/playlistRoutes'));

// // Route gốc
// app.get('/', (req, res) => {
//   res.send('API đang hoạt động');
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server chạy tại http://localhost:${PORT}`);
// });

// server.js

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Thêm dòng này

dotenv.config(); // Thêm dòng này để tải các biến môi trường

const app = express();
const PORT = process.env.PORT || 3000;

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

        res.status(201).json({ message: 'Account created successfully.' });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Trang chủ để kiểm tra server đang chạy
app.get('/', (req, res) => {
    res.send('Signup Server is running.');
});

// Khởi động server
const HOST = '192.168.105.35'; // Thay bằng địa chỉ IP bạn muốn
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

