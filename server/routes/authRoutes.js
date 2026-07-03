const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyEmail,
} = require("../controllers/authController");
const verifyToken = require("../controllers/tokenverify");
const protect = require("../middleware/authMiddleware");
const { uploadPicture } = require("../middleware/cloudinaryPictureUpload");
const { updateProfilePic } = require("../controllers/profilePicController");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail);
router.put("/profile-picture", verifyToken, uploadPicture, updateProfilePic);

router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
module.exports = router;
