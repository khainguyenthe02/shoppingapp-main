const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

// Đường dẫn gốc của thư mục dự án
const rootPath = path.join(__dirname, '../shoppingapp/public/images');

// Hàm cấu hình multer
const createMulterStorage = (subFolder) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(rootPath, subFolder)); // Lưu vào thư mục con tương ứng
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // Tên file: timestamp + đuôi file
        }
    });
};

// Tạo multer cho từng loại ảnh
const employeeUpload = multer({ storage: createMulterStorage('employee') });
const productUpload = multer({ storage: createMulterStorage('product') });
const userUpload = multer({ storage: createMulterStorage('user') });

// API upload ảnh cho employee
app.post('/upload/employee', employeeUpload.single('image'), (req, res) => {
    console.log('File upload request received');
    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ image: `/images/employee/${req.file.filename}` });
});
// API upload ảnh cho product
app.post('/upload/product', productUpload.single('productImage'), (req, res) => {
    res.json({ image: `/images/product/${req.file.filename}` });
});

// API upload ảnh cho user
app.post('/upload/user', userUpload.single('userImage'), (req, res) => {
    res.json({ filePath: `/images/user/${req.file.filename}` });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
