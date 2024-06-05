// Register module/require aliases
require("module-alias/register");

// Patches
const { inject, errorHandler } = require("express-custom-error");
inject(); // Patch express in order to use async / await syntax

// Require Dependencies

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const authController = require("./controllers/user.js");

const logger = require("@util/logger");

// Load .env Enviroment Variables to process.env

require("mandatoryenv").load(["DB_URL", "PORT", "SECRET"]);

const { PORT, SECRET, DB_URL } = process.env;

// Instantiate an Express Application
const app = express();

// Configure Express App Instance
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
// // This middleware adds the json header to every response
// app.use("*", (req, res, next) => {
//   res.setHeader("Content-Type", "application/json");
//   next();
// });

// Assign Routes

app.use("/", require("@routes/router.js"));
app.use("/user", require("@routes/user.js"));
app.use("/post", authController.checkAuth, require("@routes/post.js"));
app.use("/comment", authController.checkAuth, require("@routes/comment.js"));

// Handle errors
app.use(errorHandler());

// Handle not valid route
app.use("*", (req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// Open Server on selected Port
app.listen(PORT, () => {
  console.info("Server listening on port ", PORT);
  mongoose.connect(DB_URL).then(() => {
    console.log("Connected to database");
  });
});
