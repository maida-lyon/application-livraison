const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", verifyToken, getProfile);

// Optionnel : voir tous les utilisateurs
const User = require("../models/User");
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;
