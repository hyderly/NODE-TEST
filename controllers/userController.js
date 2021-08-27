import asyncHandler from "express-async-handler";

import { UserModel } from "../models/UserModel.js";
import generateWebToken from "../utils/generateWebToken.js";

// Request: POST
// Route: POST /api/users/register
// Access: Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, isAdmin } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(201);
    throw new Error("User Already Exists");
  }

  if (password !== confirmPassword) {
    res.status(201);
    throw new Error("Password does not matched");
  }

  const user = await UserModel.create({ name, email, password, isAdmin });

  user.save();

  res.status(200);
  res.json({ success: true, message: "User Created Successfuly" });
});

// Request: POST
// Route: POST /api/users/login
// Access: Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Wrong email or password");
  }

  // Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Wrong email or password");
  }

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter email and password");
  }

  if (user && (await user.matchPassword(password))) {
    res.status(200);
    res.json({
      id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
      email,
      token: generateToken(user._id),
    });
  }
});
