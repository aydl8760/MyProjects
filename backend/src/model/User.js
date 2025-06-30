const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
