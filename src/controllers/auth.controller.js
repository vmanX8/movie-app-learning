const users = require("../models/users.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { JWT_secret } = require("../config/auth");

const login = async (req, res) => {
    const { username, pass } = req.body;

      if (!username || !pass) {
      return res.status(400).json({ error: "400: Username and password are required", message: "Please provide both username and password in the request body" });
      }

    const user = users.find((user) => user.username === username);

      if (!user) {
      return res.status(401).json({ error: "401: Invalid credentials", message: "Please check your username and password" });
      }

      const isPasswordValid = await bcrypt.compare(pass, user.pass);

      if (!isPasswordValid) {
      return res.status(401).json({ error: "401: Invalid credentials", message: "Please check your username and password" });
      }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_secret, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, user: { id: user.id, username: user.username } });

};

const logout = (req, res) => {
    res.json({ message: "Logout successful. Please remove the token from your client-side storage." });
};

module.exports = {
  login,
  logout
};
