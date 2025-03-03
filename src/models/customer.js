const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: [
      {
        street: {
          type: String,
          require: true,
        },
        city: {
          type: String,
          require: true,
        },
        state: {
            type: String,
            require: true,
        },
        country: {
            type: String,
            require: true,
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
