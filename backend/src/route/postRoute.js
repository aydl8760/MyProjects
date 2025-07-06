const express = require("express");
const {
  createPost,
  getAllBlogs,
  getPostsByUser,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

router.post("/create", createPost);
router.get("/", getAllBlogs);
router.get("/:id", getPostsByUser);
router.delete("/:id", deletePost);

module.exports = router;
