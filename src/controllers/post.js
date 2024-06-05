const Post = require("../models/posts.js");
const User = require("../models/User.js");
const Comment = require("../models/comment.js");
const {
  getUser,
  getAndDeleteComments,
  getOnePost,
} = require("../util/other.js");

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
  likepost: async (req, res) => {
    const { postid, username } = req.body;
    if (!postid || !username) {
      return res.status(401).json({ message: "please include post id" });
    }
    let post = await getOnePost(postid);
    const user = await getUser(username);
    if (!post || !user) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    let message;
    if (post.Likes.includes(user._id)) {
      post.Likes = post.Likes.filter((id) => {
        id !== user._id;
        message = "post liked successfully";
      });
    } else {
      post.Likes.push(user._id);
    }
    message = "post unliked successfully";
    post.save();
    return res.status(201).json({ message, post });
  },
  getAllPosts: async (req, res) => {
   try {
     const posts = Post.find();
     res.status(201).json({ message: "success", posts: posts });
   } catch (error) {
     console.log(error.message);
     return res.status(401).json({ message: "error getting posts" });
   }
    
  }
};
module.exports = postController;
