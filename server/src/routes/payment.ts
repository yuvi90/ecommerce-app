import express from "express";
import { PaymentController } from "../controllers/payment.js";

const router = express.Router();

// route - /api/payment/create
router.post("/create", PaymentController.createPaymentIntent);

export default router;
