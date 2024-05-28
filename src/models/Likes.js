const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);
