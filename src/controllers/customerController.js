const Customer = require("../models/customer");
const { generateJWT, authMiddleware, hashPassword } = require("../utils/security");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  try {
    const {name, phone, address, email, password } = req.body;
    const checkEmailExited = await Customer.findOne({ email });
    if (checkEmailExited) {
      return res.status(401).json({ message: "Email already registered" });
    }

    const phoneRegex = /^(0[3-9]{1}[0-9]{8})$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    const hashedPassword = await hashPassword(password);
    const userRegister = new Customer({
        name,
        email,
        password: hashedPassword,
        phone,
        address
      });
    const saveUser = await userRegister.save();
    res.status(201).json({
        message: "Register success",
        saveUser
    });  
  } catch (error) {
    console.error("Lỗi :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await Customer.findOne({ email });
    if (!userLogin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, userLogin.password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const jwt = await generateJWT(userLogin);
    res.status(200).json({
      JWT: jwt,
      User: {
        email: userLogin.email,
        phone: userLogin.phone,
        address: userLogin.address,
      },
    });
  } catch (error) {
    console.error("Lỗi :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
