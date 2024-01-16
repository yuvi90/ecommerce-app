import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// Importing Locals
import config from "../config/index.js";
import { cache } from "../app.js";
import { InvalidateCacheProps, JwtPayload, RefreshTokenPayLoad } from "../types/types.js";

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
    const accessToken = jwt.sign(tokenPayload, config.jwtRefreshSecret, {
      expiresIn: config.jwtRefreshTokenExpiry,
    });
    return accessToken;
  } catch (error) {
    return null;
  }
};

export const verifyToken = <T>(token: string, type: "access" | "refresh" = "access"): T | null => {
  try {
    const secret = type === "access" ? config.jwtSecret : config.jwtRefreshSecret;
    const decoded = jwt.verify(token, secret) as T;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const invalidateCache = ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = ["latest-products", "categories", "all-products"];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);

    if (typeof productId === "object") productId.forEach((i) => productKeys.push(`product-${i}`));

    cache.del(productKeys);
  }
  if (order) {
    const ordersKeys: string[] = ["all-orders", `my-orders-${userId}`, `order-${orderId}`];

    cache.del(ordersKeys);
  }
  if (admin) {
    cache.del(["admin-stats", "admin-pie-charts", "admin-bar-charts", "admin-line-charts"]);
  }
};
