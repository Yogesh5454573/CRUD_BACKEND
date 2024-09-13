const mongoose = require('mongoose');

// Define the schema for the user entity
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Create and export the Mongoose model for the "users" collection based on the userSchema
module.exports = mongoose.model("User", userSchema);
