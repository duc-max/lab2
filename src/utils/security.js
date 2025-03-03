const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateJWT = (user) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id: user._id,
        email: user.email,
      };
      const secretKey =
        process.env.JWT_SECRET || "Kz8N4bGzZrP!mXyQe2T@vW9*LpRs^D3o";
      jwt.sign(payload, secretKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  };
  const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }
    try {
      const secretKey = "Kz8N4bGzZrP!mXyQe2T@vW9*LpRs^D3o";
      const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
    }
  };
  const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
};
  module.exports = {
    generateJWT,
    authMiddleware,
    hashPassword
  }