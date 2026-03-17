const protect = (req, res, next) => {
  const token = req.headers.authorization; 

if (!token) {
    return res.status(401).json({ error: "401: No token provided" });
  }
    if (token !== "secret-token") {
    return res.status(403).json({ error: "403: Invalid token" });
    }
    next();
};

module.exports = { protect };