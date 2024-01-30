import { Request, Response } from "express";
import Order, { IOrder } from "../models/order.js";

interface NewOrderRequestBody<T> extends Request {
  body: T;
}

export const OrdersController = {
  createOrder: async (req: NewOrderRequestBody<IOrder>, res: Response) => {
    try {
      const { user, customerName, products } = req.body;
      if (customerName && products) {
        throw new Error();
      }
      const totalAmount = products?.reduce(
        (total, product) => total + product.quantity * product.price,
        0,
      );

      const order = new Order({
        user,
        customerName,
        products,
        totalAmount,
      });

      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllOrders: async (req: Request, res: Response) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
