const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  Likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  post: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
