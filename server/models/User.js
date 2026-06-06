const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
    default: null,
  },
});
module.exports = mongoose.model("User", userSchema);
