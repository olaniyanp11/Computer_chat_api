const Comment = require("../models/comment.js");
const User = require("../models/User.js");
const Post = require("../models/posts.js");
const { post } = require("../routes/post.js");

const getUser = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error fetching user");
  }
};
const getPost = async (id) => {
  try {
    const post = await Post.findOne({ _id: id });
    return post;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error fetching post");
  }
};
const commentController = {
  createComment: async (req, res) => {
    const { username, comment, postid } = req.body;
    try {
      const user = await getUser(username);
      if (!user) {
        return res.status(401).json({ message: "invalid username" });
      }
      if (!username || !comment || !postid) {
        return res.status(401).json({ message: "please input all fields" });
      }
      let post = await getPost(postid);
      if (!post) {
        return res.status(401).json({ message: "couldnt retreive post" });
      }
      const newComment = new Comment({ username, comment, postid });
      let savedcomment = await newComment.save();
      await post.comments.push(savedcomment._id);
      await post.save();
      return res
        .status(200)
        .json({ message: "comment created successfully", comment: newComment });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "internal server error" });
    }
  },

  getComment: async (req, res) => {
    const commentid = req.params.id;
    try {
      if (!commentid) {
        return res.status(401).json({ message: "please include comment id" });
      }
      const comment = await Comment.findOne({ _id: commentid });
      if (!comment) {
        return res.status(401).json({ message: "invalid comment id" });
      }
      return res
        .status(200)
        .json({ message: "retrived comment", comment: comment });
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: "internal server error" });
    }
  },
  updateComment: async (req, res) => {
    const commentid = req.params.id;
    const { comment, username } = req.body;
    if (!comment || !username) {
      return res.status(401).json({ message: "please input all fields" });
    }
    try {
      if (!commentid) {
        return res.status(401).json({ message: "please include comment id" });
      }
      const newcomment = await comment.findOneAndUpdate(
        { _id: commentid },
        { username: username, comment: comment },
        { new: true }
      );
      if (!comment) {
        return res.status(401).json({ message: "invalid comment id" });
      }
      return res
        .status(200)
        .json({ message: "retrived comment", comment: newcomment });
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: "internal server error" });
    }
  },
  deleteComment: async (req, res) => {
    const commentid = req.params.id;
    try {
      if (!commentid) {
        return res.status(401).json({ message: "please include comment id" });
      }
      const comment = await comment.findOneAndDelete({ _id: commentid });
      if (!comment) {
        return res.status(401).json({ message: "invalid comment id" });
      }
      return res
        .status(200)
        .json({ message: "comment deleted successfully", comment: comment });
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: "internal server error" });
    }
  },
};
module.exports = commentController;
