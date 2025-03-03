const mongoose = require("mongoose");
const category = require("./category");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,

    },
    price: {
        type: Number,
        require: true,
    },
    stock: {
        type: Number,
        min: 0,
        max: 100,
        require: true,

    },
    supplier: {
        type: String,
        require: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: category,
        require: true,
    }

}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema);