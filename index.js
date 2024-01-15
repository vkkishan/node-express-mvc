const express = require("express");
const app = express();
const db = require("./src/config/index");
const bodyParser = require("body-parser");
// require("./demo");
const { userRoute, productRoute } = require("./src/route/index");
require("dotenv").config();

db.dbConnection();

app.use(express.json());

// for image get
app.use(express.static("./"));

app.use("/", userRoute);
app.use("/product", productRoute);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(res.status(404).json({ message: "Route not found" }));
});

app.listen(process.env.PORT, () => {
  console.log(`=====> server_connected ${process.env.PORT} <=====`);
});
