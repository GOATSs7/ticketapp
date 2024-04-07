const express = require("express");
const User = require("../Models/User.models");

const router = express.Router();

// Login endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({
      username: username,
      password: password,
    });

    // Assign roles based on username
    let role = "user"; // Default role

    if (user.username === "admin") {
      role = "admin";
    } else if (user.username.startsWith("tech")) {
      role = "techSupport";
    }

    // Send the assigned role to the frontend
    res.json({ role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Signup endpoint
router.post("/signup", async (req, res) => {
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;

    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Create a new user using the User model
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    // Return an error response
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
