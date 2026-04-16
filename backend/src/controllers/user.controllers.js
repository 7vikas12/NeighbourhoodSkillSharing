import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };

  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get data
  const { username, email, password } = req.body;

  // Validation
  if ([username, email, password].some(field => field?.trim() === "")) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // Create user (password will be hashed automatically)
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  // Remove sensitive fields
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  // Check creation
  if (!createdUser) {
    throw new ApiError(500, "Error while registering user");
  }

  // Send response
  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // validation
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required!");
  }

  if (!password) {
    throw new ApiError(400, "Password is required!");
  }

  // find user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User doesn't exist!");
  }

  // check password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials!");
  }

  // generate tokens (KEEPING YOUR FUNCTION)
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  // remove sensitive fields
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // cookie options
  const options = {
    httpOnly: true,
    secure: true, // change to false in local if needed
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // remove refresh token from DB
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "", // use empty string instead of undefined
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // fix for dev/prod
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { generateAccessAndRefreshTokens, registerUser, loginUser, logoutUser, refreshAccessToken };
