const jwt = require("jsonwebtoken");
const { JWT_secret } = require("../config/auth");


const protect = (req, res, next) => {
  const authheader = req.headers.authorization; 
  if (!authheader) {
    return res.status(401).json({ error: "401: No token provided" });
  }

  const token = authheader.startsWith("Bearer ") ? authheader.split(" ")[1] : authheader;

  try {
    const decoded = jwt.verify(token, JWT_secret);

    req.user = { id: decoded.id, username: decoded.username };

    next();
  }catch (error) {
    return res.status(401).json({ error: "401: Invalid token" });
  }
};

module.exports = { protect };