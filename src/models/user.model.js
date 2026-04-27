import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      // use cloudinary
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    role:{
      default: "user"
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export { User };
