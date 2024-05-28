const User = require("../models/User.js")
const Comment = require("../models/comment.js")
const Post = require("../models/posts.js")

const getUser = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error fetching user");
  }
};
const getOnePost = async (id) => {
  try {
    const post = await Post.findOne({ _id :id});
    return post;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error fetching user");
  }
};
const getAndDeleteComments = async (commentArray) => {
  try {
    for (const commentid of commentArray) {
      await Comment.findByIdAndDelete(commentid);
    }
    return { message: "Comments deleted successfully" };
  } catch (error) {
    console.error(error.message);
    throw new Error("Error deleting user comment");
  }
};
module.exports ={ getUser,getAndDeleteComments,getOnePost}