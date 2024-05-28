const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("mandatoryenv").load(["DB_URL", "PORT", "SECRET"]);
const { PORT, SECRET, DB_URL } = process.env;

const userController = {
  signup: async (req, res) => {
    let { firstname, lastname, username, email, password, profilePicture } =
      req.body;
    if (!firstname || !lastname || !email || !username || !password) {
      res.status(401).json({ message: "please include all fields" });
    } else if (!profilePicture) {
      profilePicture = "denfaultpicture.jpg";
    } else if (length(password) < 6) {
      res.status(401).json({ message: "password length must be above 5 " });
    }
    try {
      const hashedpassword = await bcrypt.hash(password, 10);
      password = hashedpassword;
      const newuser = new User({
        firstname,
        lastname,
        username,
        email,
        password,
        profilePicture,
      });
      await newuser.save().then(() => {
        console.log("new user created");
      });
      res
        .status(201)
        .json({ message: "user saved successfully", user: newuser });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username && !email) {
        return res
          .status(401)
          .json({ message: "please include username or email" });
      } else if (!password) {
        return res
          .status(401)
          .json({ message: "please include a valid password " });
      }

      let user;
      if (username) {
        user = await User.findOne({ username: username });
      } else {
        user = await User.findOne({ email: email });
      }
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: "invalid username" });
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid)
        return res.status(401).json({ message: "invalid password" });
      const token = jwt.sign({ _id: user._id }, SECRET, {
        expiresIn: "1d",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000,
        }) // Set the token cookie
        .status(201)
        .json({ message: "User logged in" });
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ message: "internal server error " });
    }
  },
  checkAuth: async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "token not found" });
      }
      const isValid = jwt.verify(token, SECRET);
      if (!isValid) {
        return res.status(401).json({ message: "invalid token" });
      }
      const id = jwt.decode(token);
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(401).json({ message: "invalid token id" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: "internal server error" });
    }
  },
  getAllUsers: async (req, res) => {
    const userid = req.params.id;
    try {
      if (!userid) {
        return res.status(401).json({ message: "please include a username" });
      }
      const user = await User.findOne({ _id: userid });
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      return res.status(200).json({ message: "user found", user: user });
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: "internal server error" });
    }
  },
  getUser: async (req, res) => {
    const userid = req.params.username;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: "user not found" });
      return res.status(200).json({ message: "user found", user: user });
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: "internal server error" });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true });
    res.status(200).json({ message: "User logged out successfully" });
  },
};
module.exports = userController;
