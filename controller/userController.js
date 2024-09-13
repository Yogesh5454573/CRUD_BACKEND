const mongoose = require('mongoose'); // Import Mongoose
const User = require('../model/userModel.js'); // Import User model

// For posting data into the database
const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const savedUser = await userData.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error); // Log the error to the console
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// For getting all users from the database
const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "Users not found." });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error to the console
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// For updating user data
const update = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check for duplicate email if it has been modified
    const { email } = req.body;
    if (email && email !== userExist.email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ message: "Email already in use." });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(500).json({ error: "Failed to update user." });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error); // Log the specific error
    res.status(500).json({ error: "Internal Server Error." });
  }
};


// For deleting data from the database
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error); // Log the specific error
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = { create, fetch, update, deleteUser };
