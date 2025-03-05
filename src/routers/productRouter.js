const express = require("express");
const productController = require("../controllers/productController");
const {authMiddleware,authorizeRole} = require("../utils/security");
const router = express.Router();

router.get("/",authMiddleware, productController.getAllProduct);
router.post("/create",authMiddleware, authorizeRole("Admin"), productController.createProduct);
router.post("/update/:id",authMiddleware, authorizeRole("Admin"), productController.updateProduct);
router.post("/delete/:id",authMiddleware, authorizeRole("Admin"), productController.deleteProduct);
router.get("/search",authMiddleware, authorizeRole("Admin"), productController.searchProduct);
router.get("/filter",authMiddleware, authorizeRole("Admin"), productController.filterProduct);
router.get("/sort",authMiddleware, authorizeRole("Admin"), productController.sortProduct);
router.get("/:id",authMiddleware, authorizeRole("Admin"), productController.getProductById);
module.exports = router;
