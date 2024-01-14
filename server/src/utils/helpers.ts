import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// Importing Locals
import config from "../config/index.js";
import { JwtPayload, RefreshTokenPayLoad } from "../types/types.js";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "ecom",
    })
    .then((c) => console.log(`DB Connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const generateAccessToken = (tokenPayload: JwtPayload): string | null => {
  try {
    const accessToken = jwt.sign(tokenPayload, config.jwtSecret, {
      expiresIn: config.jwtTokenExpiry,
    });
    return accessToken;
  } catch (error) {
    return null;
  }
};

export const generateRefreshToken = (tokenPayload: RefreshTokenPayLoad): string | null => {
  try {
    const accessToken = jwt.sign(tokenPayload, config.jwtSecret, {
      expiresIn: config.jwtTokenExpiry,
    });
    return accessToken;
  } catch (error) {
    return null;
  }
};

export const verifyToken = <T>(token: string): T | null => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as T;
    return decoded;
  } catch (error) {
    return null;
  }
};
