import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/utility-class.js";
import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import config from "@config/index.js";

// Login
export const loginUser = TryCatch(async (req, res, next) => {
  // Request body
  const reqBody: {
    user: string;
    pwd: string;
  } = req.body;
  const { user, pwd } = reqBody;

  try {
    // Check username and password presence
    if (!user || !pwd) throw new ErrorHandler("Username and Password are required !", 400);

    // Check User existence
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) throw new ErrorHandler("Invalid Username !", 400); // No User

    // Check Password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (!match) {
      throw new ErrorHandler("Incorrect Username and Password !", 400);
    }

    // Generating Tokens
    const accessToken = jwt.sign(
      {
        user: {
          _id: foundUser._id.toString(),
          username: foundUser.username,
          role: foundUser.role,
        },
      },
      config.jwtSecret,
      { expiresIn: "30s" },
    );

    const refreshToken = jwt.sign({ username: foundUser.username }, config.jwtSecret, {
      expiresIn: "1d",
    });

    // Save RefreshToken in Database
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    if (result) {
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: "none",
        // secure: true,
      });
      return res.status(201).json({ status: true, accessToken });
    } else {
      throw new ErrorHandler("Something went wrong !", 500);
    }
  } catch (error) {
    next(error);
  }
});

// Logout
export const logoutUser = TryCatch(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No Content
  const refreshToken = cookies.jwt;
  // Check user existence with refresh token
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true }); // sameSite: "None", secure: true
    return res.sendStatus(204);
  }
  foundUser.refreshToken = "";
  await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true }); // sameSite: "None", secure: true
  return res.sendStatus(204);
});

// Refresh
export const refreshAccessToken = TryCatch(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  // Check user existence with refresh token
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.status(403); // Forbidden

  // Validate refresh token
  const decoded = jwt.verify(refreshToken, config.jwtSecret);

  if (typeof decoded === "string") {
    return next(new ErrorHandler("Invalid token payload", 403));
  }
  const decodedUser = decoded?.user;
  if (!decodedUser?.username || !decodedUser?.role) {
    return next(new ErrorHandler("Invalid token payload", 403));
  }

  if (foundUser.username !== decoded.username) {
    return res.sendStatus(403); // Forbidden (invalid token)
  }

  // Generate a new access token
  const accessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser.username,
        role: foundUser.role,
      },
    },
    process.env.TOKEN_SECRET || "",
    { expiresIn: "15m" },
  );

  res.status(201).json({ accessToken });
});
