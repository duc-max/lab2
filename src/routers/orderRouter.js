const express = require('express');
const { createOrder, viewAllOrderByCustomerId, viewAllOrder } = require('../controllers/orderController');
const { authMiddleware } = require('../utils/security');

const router = express.Router();


router.get("/", viewAllOrder);
router.post("/createOrder",  createOrder);
router.get("/customer/:id", viewAllOrderByCustomerId);




module.exports = router;