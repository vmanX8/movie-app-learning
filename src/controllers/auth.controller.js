const users = require("../models/users.model");
const activeTokens = require("../models/token.model");

const login = (req, res) => {
  const { username, pass } = req.body;

    if (!username || !pass) {
    return res.status(400).json({ error: "400: Username and password are required", message: "Please provide both username and password in the request body" });
    }

  const user = users.find((user) => user.username === username && user.pass === pass);

    if (!user) {
    return res.status(401).json({ error: "401: Invalid credentials", message: "Please check your username and password" });
    }

  const token = `token-${user.id}-${Date.now()}`;

  activeTokens.push({ token, userId: user.id });


    res.json({ message: "Login successful", token, user: { id: user.id, username: user.username } });
};

const logout = (req, res) => {
  const token = req.headers.authorization;

  const tokenIndex = activeTokens.findIndex((entry) => entry.token === token);

    if (tokenIndex === -1) {
    return res.status(400).json({ error: "400: Invalid token", message: "The provided token is not valid or user has already been logged out" });
    }
    
  activeTokens.splice(tokenIndex, 1);

    res.json({ message: "Logout successful" });
};

module.exports = {
  login,
  logout
};