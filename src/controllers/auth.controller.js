const users = require("../models/users.model");

const login = (req, res) => {
  const { username, pass } = req.body;
    if (!username || !pass) {
    return res.status(400).json({ error: "400: Username and password are required" });
    }
  const user = users.find((user) => user.username === username && user.pass === pass);

    if (!user) {
    return res.status(401).json({ error: "401: Invalid credentials" });
    }
    res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
};

module.exports = {
  login
};