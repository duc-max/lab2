const express = require("express");
const { register,login } = require("../controllers/customerController");
const { authMiddleware } = require("../utils/security");
const router = express.Router();

router.post("/register", authMiddleware, register);
router.post("/login", login);

module.exports = router;