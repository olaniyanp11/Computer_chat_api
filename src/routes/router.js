const router = require("express").Router();
const userController = require("../controllers/user.js");

// You can require and use your routes here ;)
router.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to authenticated webapp" });
});
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
