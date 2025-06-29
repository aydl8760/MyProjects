const express = require("express");

const router = express.Router();

const {
  createUser,
  filterUser,
  getUserById,
  updateUser,
  deleteUser,
  deleteUnderageUsers,
} = require("../controllers/userControllers");

router.post("/", createUser);

router.get("/", filterUser);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/underage", deleteUnderageUsers);

router.delete("/:id", deleteUser);

module.exports = router;
