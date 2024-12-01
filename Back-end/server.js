const express = require('express');
const helmet = require('helmet');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer'); // Cài đặt multer để xử lý upload file
const cloudinary = require('cloudinary').v2; // Cài đặt Cloudinary SDK
require('dotenv').config(); // Để sử dụng biến môi trường từ file .env

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình Multer để lưu video vào thư mục uploads tạm thời
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục tạm để lưu video
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Tạo tên file duy nhất
  },
});

const upload = multer({ storage: storage });

// Middleware: Cấu hình Content Security Policy (CSP) và CORS
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:"], // Cho phép hình ảnh base64
        mediaSrc: ["'self'", "https://res.cloudinary.com"], // Cho phép video từ Cloudinary
      },
    },
  })
);

// Sử dụng CORS để cho phép các yêu cầu từ các nguồn khác
app.use(cors());

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: 'dqubbut60',  // Thay bằng cloud name của bạn
  api_key: '289353125148622',  // Thay bằng API key của bạn
  api_secret: 'lLT9qr0VpyY64PYq23U_c1Ehd-M',  // Thay bằng API secret của bạn
});

// Endpoint để upload video lên Cloudinary
app.post('/upload', upload.single('video'), async (req, res) => {
  // Kiểm tra xem file có được gửi lên không
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No video file uploaded' });
  }

  try {
    // Upload video lên Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video',  // Đảm bảo là video
      public_id: `video_${Date.now()}`,  // Tạo ID công khai cho video
    });

    // Trả về URL của video vừa upload lên Cloudinary
    res.json({
      success: true,
      message: 'Video uploaded successfully',
      video_url: result.secure_url,  // URL của video trên Cloudinary
    });

  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ success: false, message: 'Failed to upload video to Cloudinary' });
  }
});

// Endpoint: Trả về danh sách video từ Cloudinary
app.get('/videos', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/dqubbut60/resources/video`,
      {
        auth: {
          username: '289353125148622',  // API Key
          password: 'lLT9qr0VpyY64PYq23U_c1Ehd-M',  // API Secret
        },
      }
    );

    const videos = response.data.resources.map((video) => ({
      id: video.asset_id,
      url: video.secure_url,
      publicId: video.public_id,
    }));

    res.json({ success: true, videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch videos.' });
  }
});

// Lắng nghe cổng
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
