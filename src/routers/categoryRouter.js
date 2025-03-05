const express = require("express");
const {authMiddleware,authorizeRole} = require("../utils/security");
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/create",authMiddleware, authorizeRole("Admin"), createCategory);
router.get("/",authMiddleware, authorizeRole("Admin"), getAllCategories);
router.get("/:id",authMiddleware, authorizeRole("Admin"), getCategoryById);
router.put("/update/:id",authMiddleware, authorizeRole("Admin"), updateCategory);
router.delete("/delete/:id",authMiddleware, authorizeRole("Admin"), deleteCategory);

module.exports = router;
