import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  allCoupons,
  applyDiscount,
  createPaymentIntent,
  deleteCoupon,
  newCoupon,
} from "../controllers/payment.js";

const app = express.Router();

// route - /api/payment/create
app.post("/create", createPaymentIntent);

// route - /api/payment/coupon/new
app.get("/discount", applyDiscount);

// route - /api/payment/coupon/new
app.post("/coupon/new", adminOnly, newCoupon);

// route - /api/payment/coupon/all
app.get("/coupon/all", adminOnly, allCoupons);

// route - /api/payment/coupon/:id
app.delete("/coupon/:id", adminOnly, deleteCoupon);

export default app;
