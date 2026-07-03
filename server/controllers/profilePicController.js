const User = require("../models/User");

const updateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePicPath = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { image: profilePicPath },
      { new: true },
    );
    res.status(200).json({
      message: "Profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile picture",
      error: error.message,
    });
  }
};

module.exports = {
  updateProfilePic,
};
