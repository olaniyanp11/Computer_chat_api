const router = require("express").Router();
const postController = require("../controllers/post.js");

// You can require and use your routes here ;)
router.post("/create", postController.createPost);
router.post("/like", postController.likepost);
router.get("/get/:id", postController.getPost);
router.delete("/delete/:id", postController.deletePost);
router.patch("/update/:id", postController.updatePost);

module.exports = router;
