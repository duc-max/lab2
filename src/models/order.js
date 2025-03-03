const mongoose = require("mongoose");
const product = require("./product");
const customer = require("./customer");



const orderSchema = new mongoose.Schema({
    orderDate: {
        type: String,
        require: true,

    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            require: true,
        }
    ],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        require: true,
    },
    totalPrice: {
        type: Number,
        require: true,
    }
      

}, {timestamps: true})

module.exports = mongoose.model("Order", orderSchema);