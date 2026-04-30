import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiError } from "../../utils/apiError.js";
import { User } from "../../models/user.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.service.js";
import { apiResponse } from "../../utils/apiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { email, name, password } = req.body;
  // validation
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All field fields are required");
  }
  // check if user already exists: email
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new apiError(409, "User with this email already exists");
  }
  // check for images
  const avatarLocalPath = req.file?.path;
  // console.log(req.file);
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is required");
  }
  // upload cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // cloudinary check
  if (!avatar) {
    throw new apiError(400, "Avatar uploading error in cloudinary");
  }
  // create user object - create entry in db
  const user = await User.create({
    name,
    avatar: avatar?.url,
    email,
    password,
  });
  // console.log(user);
  // remove password and refresh token field from response
  const createdUser = await User.findOne(user?._id).select(
    "-password -refreshToken"
  );
  // check for user creation
  if (!createdUser) {
    throw new apiError(500, "something went wrong while creating a user");
  }

  // return res
  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "user registered successfully"));
});

export { registerUser };
