import { config as env } from "dotenv";
env();

export default {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.TOKEN_SECRET || "",
  stripeKey: process.env.STRIPE_KEY || "",
  mongoURI: process.env.MONGO_URI || "",
};
