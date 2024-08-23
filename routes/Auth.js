const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import the User model
const router = express.Router(); // Create an instance of the Express router

// Route to register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body
  try {
    // Check if a user with the given email already exists in the database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" }); // If user exists, return an error
    }

    // If user doesn't exist, create a new user instance with the provided email and password
    user = new User({ email, password });
    await user.save(); // Save the user to the database

    // Create a JWT payload with the user's ID
    const payload = { user: { id: user.id } };

    // Sign a JWT token with the payload and secret key, set to expire in 1 hour
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err; // If there is an error during signing, throw it
        res.json({ token }); // Return the signed token in the response
      }
    );
  } catch (err) {
    res.status(500).send("Server error"); // If there is a server error, return a 500 status
  }
});

// Route to log in an existing user
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body
  try {
    // Check if a user with the given email exists in the database
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" }); // If user doesn't exist, return an error
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" }); // If passwords don't match, return an error
    }

    // Create a JWT payload with the user's ID
    const payload = { user: { id: user.id } };

    // Sign a JWT token with the payload and secret key, set to expire in 1 hour
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err; // If there is an error during signing, throw it
        res.json({ token }); // Return the signed token in the response
      }
    );
  } catch (err) {
    res.status(500).send("Server error"); // If there is a server error, return a 500 status
  }
});

module.exports = router; // Export the router to be used in the main application file
