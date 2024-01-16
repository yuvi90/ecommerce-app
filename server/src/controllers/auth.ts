import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import validator from "validator";
// Importing Locals
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/helpers.js";
import userService from "../services/useService.js";

// Types
import { JwtPayload, RefreshTokenPayLoad } from "../types/types.js";
interface TypedRequestBody<T> extends Request {
  body: T;
}
interface TypedRequestCookies extends Request {
  cookies: {
    jwt?: string;
  };
}

const AuthController = {
  // Register New User
  registerUser: async (
    req: TypedRequestBody<{
      user: string;
      pwd: string;
      email: string;
    }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { user, pwd, email } = req.body;

    try {
      // Check username and password presence
      if (!user || !pwd || !email) {
        res.status(400).json({ status: false, message: "Incomplete fields !" });
      }

      // Check for valid email
      const isEmail = validator.default.isEmail(email);
      if (!isEmail) {
        res.status(400).json({ status: false, message: "Provide valid email !" });
      }

      // Check for duplicate username or email
      const duplicateUser = await userService.getUserByUsername(user);
      const duplicateEmail = await userService.getUserByEmail(email);

      if (duplicateUser || duplicateEmail) {
        // Conflict
        res.status(409).json({ status: false, message: "User already exits !" });
      }

      // Encrypt Password
      const hashedPwd = await bcrypt.hash(pwd, 12);

      // Create and store new user
      const result = await userService.createUser({
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
        throw new Error("Something went wrong !");
      }
    } catch (error) {
      next(error);
    }
  },

  // Login User
  loginUser: async (
    req: TypedRequestBody<{
      user: string;
      pwd: string;
    }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { user, pwd } = req.body;

    try {
      // Check username and password
      if (!user || !pwd)
        return res.status(400).json({
          status: false,
          message: "Username and Password are required !",
        });

      // Check User existence
      const foundUser = await userService.getUserByUsername(user);

      if (!foundUser) {
        // No User
        return res.status(400).json({
          status: false,
          message: "Invalid Username !",
        });
      }

      // Check Password
      const match = await bcrypt.compare(pwd, foundUser.password);
      if (!match) {
        return res.status(400).json({
          status: false,
          message: "Incorrect Password !",
        });
      }

      // Access Token
      const tokenPayload: JwtPayload = {
        user: {
          username: foundUser.username,
          role: foundUser.role,
        },
      };
      const accessToken = generateAccessToken(tokenPayload);
      if (!accessToken) {
        throw new Error("Something went wrong !");
      }

      // Refresh Token
      const refreshTokenPayload: RefreshTokenPayLoad = {
        username: foundUser.username,
      };
      const refreshToken = generateRefreshToken(refreshTokenPayload);
      if (!refreshToken) {
        throw new Error("Something went wrong !");
      }

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

        return res.status(201).json({
          status: true,
          accessToken,
        });
      } else {
        throw new Error("Something went wrong !");
      }
    } catch (error) {
      next(error);
    }
  },

  // Logout
  logoutUser: async (req: TypedRequestCookies, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    try {
      // No Content
      if (!cookies?.jwt) return res.sendStatus(204);
      const refreshToken = cookies.jwt;

      // Check user existence with refresh token
      const foundUser = await userService.getUserByProperty({ refreshToken });

      // If user not found
      if (!foundUser) {
        res.clearCookie("jwt", {
          httpOnly: true,
          // sameSite: "none",
          // secure: true,
        });
        return res.sendStatus(204);
      }

      // If user found
      foundUser.refreshToken = "";
      await foundUser.save();
      res.clearCookie("jwt", {
        httpOnly: true,
        // sameSite: "none",
        // secure: true,
      });
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },

  // Refresh Token
  refreshAccessToken: async (req: TypedRequestCookies, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    try {
      if (!cookies?.jwt) return res.sendStatus(401);
      const refreshToken = cookies.jwt;

      // Check user existence with refresh token
      const foundUser = await userService.getUserByProperty({ refreshToken });
      if (!foundUser) return res.status(403); // Forbidden

      // Validate refresh token
      const decoded = verifyToken<RefreshTokenPayLoad>(refreshToken, "refresh");

      // Forbidden (invalid token)
      if (typeof decoded === "string") {
        return res.sendStatus(403);
      }
      if (!decoded?.username) {
        return res.sendStatus(403);
      }
      if (foundUser.username != decoded?.username) {
        return res.sendStatus(403);
      }

      // Generate a new access token
      const tokenPayload: JwtPayload = {
        user: {
          username: foundUser.username,
          role: foundUser.role,
        },
      };
      const accessToken = generateAccessToken(tokenPayload);
      if (!accessToken) {
        throw new Error("Something went wrong !");
      }

      res.status(201).json({
        status: true,
        accessToken: accessToken,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
