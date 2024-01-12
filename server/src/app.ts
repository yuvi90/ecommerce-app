// Importing Packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
import NodeCache from "node-cache";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
// Importing Locals
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
import config from "./config/index.js";
// Importing Routes
import dashboardRoute from "./routes/stats.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";

console.log(config);

// Connecting Database
connectDB(config.mongoURI);

// Initialize Stripe
export const stripe = new Stripe(config.stripeKey);

// Initialize Cache
export const myCache = new NodeCache();

// Initialize Server
const app = express();

// Initializes Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API Working");
});

// Using Routes
app.use("/api/dashboard", dashboardRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);

// Public Uploads Folder
app.use("/uploads", express.static("uploads"));

// Error Middleware
app.use(errorMiddleware);

// Start Server
const port = config.port;
app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});
