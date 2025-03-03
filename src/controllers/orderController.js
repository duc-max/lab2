const Order = require("../models/order");
const Product = require("../models/product");
const Customer = require("../models/customer");

// Create a new order
const createOrder = async (req, res, next) => {
  const { products, customer } = req.body;

  try {
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Products is required" });
    }

    const productIds = products.map((item) => item._id);
    const productDetails = await Product.find({ _id: { $in: productIds } });

    if (productDetails.length !== products.length) {
      return res.status(400).json({ message: "Product not found" });
    }

    let totalPrice = 0;
    for (let i = 0; i < productDetails.length; i++) {
      const product = productDetails[i];
      const requestedProduct = products.find(
        (item) => item._id.toString() === product._id.toString()
      );

      if (product.stock < requestedProduct.quantity) {
        return res
          .status(400)
          .json({ message: `Product ${product.name} is not in stock.` });
      }

      totalPrice += product.price * requestedProduct.quantity;
      product.stock -= requestedProduct.quantity;
      await product.save();
    }

    const newOrder = new Order({
      product: products,
      customer,
      totalPrice,
    });
    await newOrder.save();

    return res.status(201).json({
      message: "Order has been created successfully.",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    // Add a fallback error status for unexpected issues
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewAllOrder = async (req, res, next) => {

    try {
        const orders = await Order.find();
        return res.status(200).json({ orders });
        
    } catch (error) {
        next(error);
    }
}

const viewAllOrderByCustomerId = async (req, res, next) => {

    try {
        const customerId = req.params.id;

        const orders = await Order.find({
            customer: customerId,
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        const listOrder = orders.map((order) => {
            return {
                id: order._id,
                orderDate: order.orderDate,
                product: order.product,
                totalPrice: order.totalPrice,
            };
        });
        
        const totalPrice = listOrder.reduce((acc, order) => {
            return acc + order.totalPrice;
        }, 0);

        return res.status(200).json({ 
            customerId: customerId,
            orders: listOrder,
            totalPrice: totalPrice,
         });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }


};

module.exports = { createOrder, viewAllOrderByCustomerId, viewAllOrder };
