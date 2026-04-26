const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");

router.get("/private", protect, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

module.exports = router;