const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      get: (v) => `http://localhost:4007/uploads/product/${v}`,
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    // toJSON: {
    //   transform: function (_doc, ret) {
    //     ret.image = `http://localhost:4007/uploads/product/${ret.image}`;
    //   },
    // },
    toJSON: {
      getters: true,
    },
  }
);

module.exports = mongoose.model("Product", productSchema);
