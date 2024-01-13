const express = require("express");
const { productController } = require("../controller");
const { upload } = require("../utils/upload");
const routes = express();

routes.post("/create", upload.single("image"), productController.createProduct);

routes.put(
  "/update/:productId",
  upload.single("image"),
  productController.updateProduct
);

routes.get("/all", productController.getAllProduct);

routes.delete("/delete/:productId", productController.deleteProduct);

module.exports = routes;
