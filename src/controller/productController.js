const { productService } = require("../service");
const { uploadImage, deleteImage } = require("../utils/upload");

exports.createProduct = async (req, res) => {
  try {
    const reqBody = req.body;

    const productImage = await uploadImage(req.file, "product");
    reqBody.image = productImage;

    const data = await productService.createProduct(reqBody);
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const reqBody = req.body;
    const productId = req.params.productId;
    const productDetails = await productService.getProduct(productId);

    if (!productDetails) {
      throw Error("Please enter valid product");
    }

    const productImage = await uploadImage(req.file, "product");
    reqBody.image = productImage;

    const data = await productService.updateProduct(productId, reqBody);

    if (req.file && data) {
      await deleteImage(`./uploads/product/${productDetails.image}`);
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const data = await productService.getAllProduct();
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productDetails = await productService.getProduct(productId);

    if (!productDetails) {
      throw Error("Please enter valid product");
    }
    await deleteImage(`./uploads/product/${productDetails.image}`);

    await productService.deleteProduct(req.params.productId);

    res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
