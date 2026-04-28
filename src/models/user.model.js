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
    role: {
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// using pre to convert plain password to hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// checking the plain  password with the hash password using mongoose method
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// generating accessToken using mongoose method
userSchema.methods.generateAccessToken = function () {};
// generating refreshToken using mongoose method
userSchema.methods.generateRefreshToken = function () {};

const User = mongoose.model("User", userSchema);
export { User };
