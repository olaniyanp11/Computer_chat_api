const router = require("express").Router();
const commentController = require("../controllers/comment.js");

// You can require and use your routes here ;)
router.post("/create", commentController.createComment);
router.get("/get/:id", commentController.getComment);
router.delete("/delete/:id", commentController.deleteComment);
router.patch("/update/:id", commentController.updateComment);

module.exports = router;
