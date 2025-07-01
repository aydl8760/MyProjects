const { imageUploadUtil } = require("../../config/cloudinary");
const User = require("../model/User");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    console.error("Error up loading image:", error);
    res.json({
      success: false,
      message: "Error occured during image upload",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, name, age, phone, role, image, maritalStatus, spouse } =
      req.body;

    if (!age || !name || !email || !image || !maritalStatus) {
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

    const newUser = new User({
      email,
      name,
      age,
      phone,
      role,
      image,
      maritalStatus,
      spouse,
    });

    await newUser.save();

    res.status(201).json({
      message: "user Created successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (allUsers.length === 0) {
      res.status(404).json({
        message: "No users Found! Create new user",
      });
    }
    res.status(200).json(allUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const filterUser = async (req, res) => {
  try {
    const { name, role, minAge, maxAge } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (role) filter.role = role;
    if (minAge || maxAge) {
      filter.age = {};
      if (minAge) filter.age.$gte = parseInt(minAge);
      if (maxAge) filter.age.$lte = parseInt(maxAge);
    }

    const users = await User.find(filter);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const updates = req.body;
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    return res.status(404).json({
      message: "user is not found",
    });
  }

  res.status(201).json({
    message: "user updated successfully",
  });
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUnderageUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    const underage = allUser.filter((uAge) => uAge.age < 18);

    for (const user of underage) {
      await User.findByIdAndDelete(user._id);
    }

    if (underage.length === 0) {
      return res.status(404).json({
        message: "No underage users found",
      });
    }

    const deletedUnderAge = underage.length;

    res.status(200).json({
      message: `${deletedUnderAge} underage users deleted successfully`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  filterUser,
  getUserById,
  updateUser,
  deleteUser,
  deleteUnderageUsers,
  handleImageUpload,
};
