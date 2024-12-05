const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const cors = require("cors");
// Middleware để xử lý JSON
app.use(express.json());
const corsOptions = {
  origin: "*", // Cho phép tất cả các nguồn (React Native, trình duyệt, v.v.)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Các phương thức được phép
  allowedHeaders: ["Content-Type", "Authorization"], // Các header được phép
};

app.use(cors(corsOptions));
// Đọc dữ liệu từ file JSON
const getData = () => {
  const rawData = fs.readFileSync("data.json");
  return JSON.parse(rawData);
};
// Ghi dữ liệu vào file JSON
const saveData = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

// Endpoint: Thêm video mới
app.post("/videos", (req, res) => {
  const newVideo = req.body;
  const data = getData();

  // Tạo ID mới cho video (dựa trên số lượng video hiện tại)
  const newId = data.videos.length > 0 ? Math.max(data.videos.map(v => v.id)) + 1 : 1;
  newVideo.id = newId;

  // Thêm video mới vào danh sách
  data.videos.push(newVideo);

  // Lưu lại dữ liệu vào file
  saveData(data);

  res.status(201).json(newVideo);  // Trả về video mới vừa thêm
});

// Endpoint: Thêm video mới
app.post("/comments", (req, res) => {
  const newComments = req.body;
  const data = getData();

  // Tạo ID mới cho comments (dựa trên số lượng video hiện tại)
  const newId = data.comments.length > 0 ? Math.max(data.comments.map(v => v.id)) + 1 : 1;
  newComments.id = newId;

  // Thêm comments mới vào danh sách
  data.comments.push(newComments);

  // Lưu lại dữ liệu vào file
  saveData(data);

  res.status(201).json(newComments);  // Trả về video mới vừa thêm
});

// Endpoint: Lấy toàn bộ danh sách videos
app.get("/videos", (req, res) => {
  const data = getData();
  res.json(data.videos);
});
app.get("/comments", (req, res) => {
  const data = getData();
  res.json(data.comments);
});
// Endpoint: Lấy video theo ID
app.get("/videos/:id", (req, res) => {
  const data = getData();
  const video = data.videos.find(v => v.id === parseInt(req.params.id));
  if (video) {
    res.json(video);
  } else {
    res.status(404).send({ error: "Video not found" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
