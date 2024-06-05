const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

router.get("/get/:id", userController.checkAuth, userController.getAllUsers);
router.get("/refresh", userController.checkAuth, userController.refreshUserInfo);

module.exports = router;
