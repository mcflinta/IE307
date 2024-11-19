const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Đã kết nối tới MongoDB');
  } catch (error) {
    console.error('Không thể kết nối tới MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
