import { Response, NextFunction } from "express";
// Importing Locals
import userService from "../services/useService.js";
import { verifyToken } from "../utils/helpers.js";

// Types
import { JwtPayload, AuthUserRequest } from "../types/types.js";

// Authentication Middleware
export const authenticate = async (req: AuthUserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized!",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken<JwtPayload>(token, "access");

    if (
      !decoded ||
      !("user" in decoded) ||
      !("username" in decoded.user) ||
      !("role" in decoded.user)
    ) {
      return res.status(403).json({
        status: false,
        message: "Invalid token payload",
      });
    }

    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
};

// Authorization Middleware
export const adminOnly = async (req: AuthUserRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user?.username || !user?.role)
      return res.status(401).json({
        status: false,
        message: "Authentication Required !",
      });

    const foundedUser = await userService.getUserByUsername(user.username);

    if (!foundedUser)
      return res.status(401).json({
        status: false,
        message: "Unauthorized !",
      });

    const allowedRoles = ["admin"];
    if (!allowedRoles.includes(user.role))
      return res.status(403).json({
        status: false,
        message: "Unauthorized !",
      });

    next();
  } catch (error) {
    next(error);
  }
};
