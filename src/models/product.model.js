import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add product name"],
      trim: true,
      maxLength: [100, "Name cannot exceed 100 character"],
    },
    description: {
      type: String,
      required: [true, "Please add product description"],
      maxLength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please add product price"],
      min: [0, "Price must be a positive number"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      require: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    product_images: [
      {
        url: String,
        public_id: String,
        required: [true, "Please add product images"],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export { Product };
