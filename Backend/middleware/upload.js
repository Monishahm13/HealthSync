const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Absolute path from current project folder
const uploadDir = path.resolve(__dirname, "../uploads/reports");

// Create folder automatically
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Upload Path:", uploadDir);
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

module.exports = multer({ storage });