const  express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);

module.exports = router;