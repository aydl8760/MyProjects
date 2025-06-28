const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.post("/", async (req, res) => {
  try {
    const { email, name, age, phone } = req.body;

    if (!age || !name || !email) {
      return res.status(400).json({
        message: "all Fields are required age, name and email",
      });
    }

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(409).json({ message: "Email already exist" });
    }

    if (isNaN(age)) {
      return res
        .status(400)
        .json({ message: "Invalid age — must be a number." });
    }

    const newUser = new User({ email, name, age, phone });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

router.delete("/underage", async (req, res) => {
  try {
    const allUser = await User.find();
    const underage = allUser.filter((uAge) => uAge.age < 18);

    for (const user of underage) {
      await User.findByIdAndDelete(user._id);
    }

    const allowUsers = await User.find();

    res.status(200).json(allowUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, email, age, phone } = req.body;
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email, age, phone },
    { new: true, runValidators: true }
  );
  if (!updatedUser) {
    return res.status(404).json({
      message: "user is not found",
    });
  }

  const users = await User.find();

  res.status(201).json(users);
});

router.get("/search", async (req, res) => {
  try {
    const name = req.query.name;
    const age = req.query.age;

    const query = {};

    if (name) {
      query.name = name.toLowerCase();
    }

    if (age) {
      const aged = parseInt(age);
      if (isNaN(aged)) {
        return res
          .status(400)
          .json({ message: "Invalid age - must be a number" });
      }
      query.age = aged;
    }

    const user = await User.find(query);

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

module.exports = router;
