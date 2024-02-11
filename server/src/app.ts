// Importing Packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import NodeCache from "node-cache";
import Stripe from "stripe";
// Importing Utilities
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/helpers.js";
import config from "./config/index.js";
// Importing Routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";

// Connecting to Database
connectDB(config.mongoURI);

// Initialize Stripe
export const stripe = new Stripe(config.stripeKey);

// Initialize Cache
export const cache = new NodeCache();

// Initialize Server
const app = express();

// Initializes Middlewares
app.use(morgan("dev"));
app.use(cors(config.corsOptions));
app.use(express.json());
app.use(cookieParser());

// Test
app.get("/", async (req, res) => {
  res.send("API Working");
});

// Public Uploads Folder
app.use("/uploads", express.static("uploads"));

// Using Routes
app.use("/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);

// Error Middleware
app.use(errorMiddleware);

// Start Server
const port = config.port;
app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});
