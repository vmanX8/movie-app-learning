const activeTokens = require("../models/tokens.model");
const users = require("../models/users.model");

const protect = (req, res, next) => {
  const token = req.headers.authorization; 

if (!token) {
    return res.status(401).json({ error: "401: No token provided" });
  }

  const storedToken = activeTokens.find((entry) => entry.token === token);

    if (!storedToken) {
    return res.status(401).json({ error: "401: Invalid token" });
    }

    const user = users.find((u) => u.id === storedToken.userId);

    req.user = user;

    next();
};

module.exports = { protect };