const Product = require("../models/product");
const { mongoose } = require("mongoose");

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    if (products?.length === 0) {
      return res.status(404).json({ message: "No product found" });
    }
    res.status(200).json({ products: products, isOk: true });
  } catch (error) {
    console.error(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product: product, isOk: true });
  } catch (error) {
    console.error(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, supplier, description, category } = req.body;
    const product = new Product({
      name: name,
      description: description,
      price: price,
      stock: stock,
      supplier: supplier,
      category: category,
    });
    await product.save().then((newDoc) => {
      res.status(201).json({ product: newDoc, isOk: true });
    });
    if (!product) {
      return res.status(400).json({ message: "Product not created" });
    }
  
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, supplier, description, category } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      name: name,
      description: description,
      price: price,
      stock: stock,
      supplier: supplier,
      category: category,
    });
    res.status(200).json({ product: product, isOk: true });

  } catch (error) {
    console.error(error);
  }
};

const getPaginatedProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const products = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Product.countDocuments();
    res.status(200).json({
      products: products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      isOk: true,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted", isOk: true });
  } catch (error) {
    console.error(error);
  }
};

const searchProduct = async (req, res) => {
  try {
    const { name } = req.query;
    const product = await Product.find({
      name: { $regex: name, $options: "i" },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product: product, isOk: true });
  } catch (error) {
    console.error(error);
  }
};

const filterProduct = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await Product.find({
      category: { $regex: category, $options: "i" },
    });
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ products: products, isOk: true });
  } catch (error) {
    console.log(error);
  }
};

const sortProduct = async (req, res) => {
  try {
    const { sort } = req.query;
    const products = await Product.find().sort({ price: sort });
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ products: products, isOk: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  getPaginatedProducts,
  deleteProduct,
  searchProduct,
  filterProduct,
  sortProduct,
};
