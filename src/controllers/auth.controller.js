const users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_secret } = require("../config/auth");

const register = async (req, res) => {
  const { username, pass } = req.body;

  if (!username || !pass) {
    return res.status(400).json({
      error: "400: Username and password are required",
      message: "Please provide both username and password in the request body",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await users.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({
        error: "409: User already exists",
        message: "A user with this username already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create the user
    const newUser = await users.create(username, hashedPassword);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (error) {
    console.error("Registration error", error);
    res.status(500).json({ error: "500: Registration failed", message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, pass } = req.body;

  if (!username || !pass) {
    return res.status(400).json({
      error: "400: Username and password are required",
      message: "Please provide both username and password in the request body",
    });
  }

  try {
    const user = await users.findByUsername(username);

    if (!user) {
      return res.status(401).json({
        error: "401: Invalid credentials",
        message: "Please check your username and password",
      });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "401: Invalid credentials",
        message: "Please check your username and password",
      });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_secret, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ error: "500: Login failed", message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.json({ message: "Logout successful. Please remove the token from your client-side storage." });
};

module.exports = {
  register,
  login,
  logout,
};
