const express = require("express");
const cors = require("vercel-cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const userRouter = require("./router/user.router");
const customerRouter = require("./router/customer.router");
const productRouter = require("./router/product.router");
const ordersRouter = require("./router/orders.router");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "UPDATE", "DELETE"],
  })
);
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", userRouter);
app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/orders", ordersRouter);
app.listen(PORT, () => `Server started on PORT ${PORT}`);
