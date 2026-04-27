import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a category name"],
    trim: true,
    unique: true,
  },
  category_image: {
    url: String,
    public_id: String,
    required: [true, "Please add category image"],
  },
});

const Category = mongoose.model("Category", categorySchema);
export { Category };
