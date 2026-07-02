const multer = require("multer");
const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

const uploadPicture = upload.single("profilePic");

module.exports = { uploadPicture };
