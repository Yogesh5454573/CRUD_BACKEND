const express = require('express');
const router = express.Router();
const { create, fetch, update, deleteUser } = require('../controller/userController');
const Joi = require('joi');

// Joi schema for user validation
const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(5).required(),
});

// Middleware to validate user data using Joi
const validateUser = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Routes with validation middleware
router.get('/getallusers', fetch); // Route to fetch all users
router.post('/create', create); // Route to create a new user
router.put('/update/:id', update); // Route to update a user by ID
router.delete('/delete/:id', deleteUser); // Route to delete a user by ID

module.exports = router;
