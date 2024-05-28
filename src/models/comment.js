const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", commentSchema);
