const Post = require("../model/Post");
const User = require("../model/User");

const createPost = async (req, res) => {
  try {
    const { title, content, user } = req.body;
    const findUser = await User.findById(user);
    if (!findUser) {
      return res.status(403).json({
        success: false,
        message: "User is not verified.",
      });
    }

    const newPost = new Post({ title, content, user });
    await newPost.save();

    await User.findByIdAndUpdate(user, { $inc: { postCount: 1 } });
    res.status(201).json({
      title,
      content,
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Post.find().populate("user", "name email");
    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ user: userId }).populate(
      "user",
      "name email"
    ); // optional populate

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedpost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedpost)
      return res.status(404).json({ message: "Blog not found" });

    await User.findByIdAndUpdate(deletedpost.user, {
      $inc: { postCount: -1 },
    });

    await User.findByIdAndUpdate(deletedpost.user, {
      $inc: { postCount: -1 },
    });

    await User.findByIdAndUpdate(deletedpost.user, {
      $max: { postCount: 0 },
    });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {}
};

module.exports = {
  createPost,
  getAllBlogs,
  getPostsByUser,
  deletePost,
};
