import { config as env } from "dotenv";
env();

export default {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.TOKEN_SECRET || "",
  jwtRefreshSecret: process.env.REFRESH_TOKEN_SECRET || "",
  jwtTokenExpiry: process.env.TOKEN_EXPIRY || "",
  jwtRefreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "",
  stripeKey: process.env.STRIPE_KEY || "",
  mongoURI: process.env.MONGO_URI || "",
  maxProductsPhotosLimit: 5,
  maxPhotosOnPage: process.env.PRODUCT_PER_PAGE || 8,
};
