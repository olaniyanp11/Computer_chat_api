const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

router.get("/:id", userController.checkAuth,userController. getAllUsers);
module.exports = router;
