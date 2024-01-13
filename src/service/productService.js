const { Product } = require("../model");

exports.createProduct = async (data) => {
  return await Product.create(data);
};

exports.updateProduct = async (productId, data) => {
  return await Product.findByIdAndUpdate(
    { _id: productId },
    {
      $set: {
        product_name: data?.product_name,
        image: data?.image,
        user: data?.user,
      },
    },
    { new: true }
  );
};

exports.getProduct = async (productId) => {
  return await Product.findOne({ _id: productId });
};

exports.getAllProduct = async () => {
  return await Product.find().sort({ createdAt: -1 }).limit(5).skip(5);
};

exports.deleteProduct = async (productId) => {
  return await Product.deleteOne({ _id: productId }, { new: true });
};
