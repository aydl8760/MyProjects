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
} = require("../controllers/userControllers");

router.post("/", createUser);

router.get("/", getAllUsers);

router.get("/search", filterUser);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/underage", deleteUnderageUsers);

router.delete("/:id", deleteUser);

module.exports = router;
