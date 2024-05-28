const Post = require("../models/posts.js");
const User = require("../models/User.js");
const Comment = require("../models/comment.js");
const getUser = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
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
const postController = {
  createPost: async (req, res) => {
    const { post, username } = req.body;
    if (!post || !username) {
      return res.status(401).json({ message: "please input all fields" });
    }
    try {
      const user = await getUser(username);
      if (!user) {
        return res.status(401).json({ message: "invalid username" });
      }
      const newpost = new Post({ post, username });
      await newpost.save().then((result) => {
        return res
          .status(200)
          .json({ message: "post created successfully", post: result });
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "internal server error" });
    }
  },
  getPost: async (req, res) => {
    const postid = req.params.id;
    try {
      if (!postid) {
        return res.status(401).json({ message: "please include post id" });
      }
      const post = await Post.findOne({ _id: postid });
      if (!post) {
        return res.status(401).json({ message: "invalid post id" });
      }
      return res.status(200).json({ message: "retrived post", post: post });
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: "internal server error" });
    }
  },
  updatePost: async (req, res) => {
    const postid = req.params.id;
    const { post, username } = req.body;
    if (!post || !username) {
      return res.status(401).json({ message: "please input all fields" });
    }
    try {
      if (!postid) {
        return res.status(401).json({ message: "please include post id" });
      }
      const newpost = await Post.findOneAndUpdate(
        { _id: postid },
        { username: username, post: post },
        { new: true }
      );
      if (!post) {
        return res.status(401).json({ message: "invalid post id" });
      }
      return res.status(200).json({ message: "retrived post", post: newpost });
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: "internal server error" });
    }
  },
  deletePost: async (req, res) => {
    const postid = req.params.id;
    try {
      if (!postid) {
        return res.status(401).json({ message: "please include post id" });
      }
      const post = await Post.findOneAndDelete({ _id: postid });
      if (!post) {
        return res.status(401).json({ message: "invalid post id" });
      }
      await getAndDeleteComments(post.comments);
      return res
        .status(200)
        .json({ message: "post deleted successfully", post: post });
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: "internal server error" });
    }
  },
};
module.exports = postController;
