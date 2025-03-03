const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
require("dotenv").config();
const customerRouter = require("./src/routers/customerRouter");
const productRouter = require("./src/routers/productRouter");
const categoryRouter = require("./src/routers/categoryRouter");

const app = express();

app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());


app.get("/", async (req, res, next) => {
    try {
        console.log(123)
    } catch (error) {
        next(error)
    }
})

app.use("/api/customer", customerRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);

app.use((err, req, res, next) => {
    if (res) {
        res.status(err.status).json({
            status: err.status,
            message: err.message,
        });
    }
})


connectDB();
app.listen(process.env.PORT, () => {
    console.log("App listening port 9999");
})