const express = require("express");
const {
  createPost,
  getAllBlogs,
  getPostsByUser,
} = require("../controllers/postController");

const router = express.Router();

router.post("/create", createPost);
router.get("/", getAllBlogs);
router.get("/:id", getPostsByUser);

module.exports = router;
