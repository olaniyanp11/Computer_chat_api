const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    Lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      require: true,
      type: String,
    },
    Friends: {
      type: Array,
    },
    verified: {
      type: Boolean,
    },
    posts: {
      type: Array,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
