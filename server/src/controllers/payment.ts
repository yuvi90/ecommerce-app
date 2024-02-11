import { Request, Response, NextFunction } from "express";
import { stripe } from "../app.js";

interface NewPaymentRequestBody<T> extends Request {
  body: T;
}

export const PaymentController = {
  async createPaymentIntent(
    req: NewPaymentRequestBody<{ amount: number }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { amount } = req.body;
      if (!amount)
        res.status(400).json({
          status: false,
          message: "Please enter amount.",
        });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount),
        currency: "usd",
        description: "Order Payment",
      });

      return res.status(201).json({
        status: true,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      next(error);
    }
  },
};
