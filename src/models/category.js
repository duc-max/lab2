const mongoose = require("mongoose");


const  categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [50, "Name can not be greater than or equal to 50 characters"],
        // enum: ["Phone", "Laptop"]

    },
    description: {
        type: String,
        required: true,
    }

}, {timestamps: true})

module.exports = mongoose.model("Category", categorySchema);