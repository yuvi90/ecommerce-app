import validator from "validator";
import bcrypt from "bcrypt";
import ErrorHandler from "../utils/utility-class.js";
import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";

// New User
export const newUser = TryCatch(async (req, res, next) => {
  // Request Body
  const newUser: {
    user: string;
    pwd: string;
    email: string;
  } = req.body;
  const { user, pwd, email } = newUser;

  // Check username and password presence
  if (!user || !pwd || !email) {
    next(new ErrorHandler("Incomplete fields !", 400));
  }

  // Check for valid email
  const isEmail = validator.default.isEmail(email);
  if (!isEmail) {
    next(new ErrorHandler("Provide valid email !", 400));
  }

  // Check for duplicate username or email
  const duplicateUser = await User.findOne({ username: user }).exec();
  const duplicateEmail = await User.findOne({ email: email }).exec();

  if (duplicateUser || duplicateEmail) {
    // Conflict
    next(new ErrorHandler("User already exits !", 409));
  }

  // Encrypt Password
  const hashedPwd = await bcrypt.hash(pwd, 12);

  // Create and store new user
  const result = await User.create({
    username: user,
    password: hashedPwd,
    email: email,
  });

  // Send Response
  if (result) {
    return res.status(201).json({
      status: true,
      success: `New user created!`,
    });
  } else {
    next(new ErrorHandler("Something went wrong !", 500));
  }
});

// Get All Users
export const getAllUsers = TryCatch(async (req, res) => {
  const users = await User.find().exec();

  return res.status(200).json({
    success: true,
    users,
  });
});

// Get User
export const getUser = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  return res.status(200).json({
    success: true,
    user,
  });
});

// Delete User
export const deleteUser = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
