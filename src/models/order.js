const mongoose = require("mongoose");
const product = require("./product");
const customer = require("./customer");

const orderSchema = new mongoose.Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    product: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: product,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          validate: {
            validator: async function (value) {
              const productDoc = await product.findById(this._id);
              if (!productDoc) {
                throw new Error(`Product with ID ${this._id} not found`);r
              }
              if (value > productDoc.stock) {
                throw new Error(
                  `Insufficient stock for product ${productDoc.name}. Requested: ${value}, Available: ${productDoc.stock}`
                );
              }
              return true;
            },
            message: "Quantity exceeds available stock",
          },
        },
      },
    ],
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
