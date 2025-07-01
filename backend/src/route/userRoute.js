const express = require("express");

const router = express.Router();

const {
  createUser,
  filterUser,
  getUserById,
  updateUser,
  deleteUser,
  deleteUnderageUsers,
  getAllUsers,
  handleImageUpload,
} = require("../controllers/userControllers");
const { upload } = require("../../config/cloudinary");

router.post("/uploadImage", upload.single("myFile"), handleImageUpload);

router.post("/", createUser);

router.get("/", getAllUsers);

router.get("/search", filterUser);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/underage", deleteUnderageUsers);

router.delete("/:id", deleteUser);

module.exports = router;
