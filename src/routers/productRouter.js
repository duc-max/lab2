const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", productController.getAllProduct);
router.post("/create", productController.createProduct);
router.post("/update/:id", productController.updateProduct);
router.post("/delete/:id", productController.deleteProduct);
router.post("/search", productController.searchProduct);
router.post("/filter", productController.filterProduct);
router.post("/sort", productController.sortProduct);
router.get("/:id", productController.getProductById);
module.exports = router;
