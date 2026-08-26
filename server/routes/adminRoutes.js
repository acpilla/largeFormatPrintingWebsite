const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: "Password required" });

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "12h" });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

module.exports = router;
