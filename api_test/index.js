// index.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Địa chỉ IP của server - thay <your-public-ip> bằng địa chỉ IP của anh
const SERVER_IP = 'http://149.28.146.58';

// Danh sách dataset (tên file và đường dẫn tải về từ máy local)
const datasets = [
    { name: 'Corn-Leaf-Diseases-Dataset', link: `${SERVER_IP}:${PORT}/files/Corn-Leaf-Diseases-Dataset.zip` },
    { name: 'iCassava-2019-Dataset', link: `${SERVER_IP}:${PORT}/files/iCassava-2019-Dataset.zip` }
];

// Endpoint để trả về danh sách các dataset và đường dẫn tải
app.get('/datasets/link', (req, res) => {
    res.json(datasets);
});

// Endpoint để tải file (trong máy local)
app.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'files', filename);

    // Kiểm tra nếu file tồn tại
    if (fs.existsSync(filePath)) {
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error downloading the file:', err.message);
                // Avoid sending an additional response by just logging the error
            }
        });
    } else {
        res.status(404).json({ error: 'File không tồn tại!' });
    }
});
// Start server
app.listen(PORT, '0.0.0.0', () => { // Lắng nghe trên tất cả các địa chỉ IP
    console.log(`Server đang chạy tại ${SERVER_IP}:${PORT}`);
});
