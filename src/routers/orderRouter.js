const express = require('express');
const { createOrder, viewAllOrderByCustomerId, viewAllOrder } = require('../controllers/orderController');
const { authMiddleware,authorizeRole } = require('../utils/security');

const router = express.Router();


router.get("/",authMiddleware, authorizeRole("Admin"), viewAllOrder);
router.post("/createOrder",authMiddleware, authorizeRole("Admin"),  createOrder);
router.get("/customer/:id",authMiddleware, authorizeRole("Admin"), viewAllOrderByCustomerId);




module.exports = router;