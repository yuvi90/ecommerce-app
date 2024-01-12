import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/utility-class.js";
import { User } from "../models/user.js";
import { TryCatch } from "./error.js";
import config from "@config/index.js";

// Authentication Middleware
export const verifyJWT = TryCatch((req, res, next) => {
  // Extract Token from header
  const authHeader: string | undefined = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return next(new ErrorHandler("Unauthorized!", 401));
  }
  const token = authHeader.split(" ")[1];

  // Verify Token
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return next(new ErrorHandler("Forbidden", 403));
    }
    // Use a type guard to ensure that decoded is of type JwtPayload
    if (typeof decoded === "string") {
      return next(new ErrorHandler("Invalid token payload", 403));
    }
    const decodedUser = decoded?.user;
    if (!decodedUser?.username || !decodedUser?.role) {
      return next(new ErrorHandler("Invalid token payload", 403));
    }

    req.user = decodedUser;

    next();
  });
});

// Authorization
export const adminOnly = TryCatch(async (req, res, next) => {
  const { userId, role } = req.query;

  if (!userId) return next(new ErrorHandler("Authentication Required !", 401));

  const user = await User.findById(userId);
  if (!user) return next(new ErrorHandler("Unauthorized !", 401));

  if (user.role !== role && role !== "admin") return next(new ErrorHandler("Unauthorized !", 403));

  next();
});
