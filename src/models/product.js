const mongoose = require("mongoose");
const category = require("./category");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: async function (value) {
          const product = await this.constructor.findOne({ name: value });
          if (product) {
            if (this.id === product.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: (props) => `Product name ${props.value} already exists`,
      },
    },
    description: {
      type: String,

      validate: {
        validator: function (value) {
          return value.length > 10;
        },
        message: "Description must be longer than 10 characters",
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    stock: {
      type: Number,
      min: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    supplier: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: category,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
