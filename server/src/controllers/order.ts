import { Request, Response, NextFunction } from "express";
import { IOrder } from "../models/order.js";
import orderService from "../services/orderService.js";

interface NewOrderRequestBody<T> extends Request {
  body: T;
}

export const OrdersController = {
  /**
   *
   * Create Order
   *
   */
  createOrder: async (req: NewOrderRequestBody<IOrder>, res: Response) => {
    try {
      const { customerName, customerUserName, shippingInfo, products, totalAmount } = req.body;

      if (!customerName || !customerUserName || !shippingInfo || !products || !totalAmount) {
        throw new Error();
      }

      const result = await orderService.createOrder({
        customerName,
        customerUserName,
        shippingInfo,
        products,
        totalAmount,
      });

      if (result) {
        return res.status(201).json({
          status: true,
          message: "Order created successfully.",
        });
      } else {
        throw new Error("Something went wrong !");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /**
   *
   * Get User Orders
   *
   */
  getUserOrders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userName = req.query.user as string;
      if (!userName) {
        return res.status(400).json({
          status: false,
          message: "Invalid Username.",
        });
      }

      const orders = await orderService.getOrderbyUserName({ customerUserName: userName });
      if (!orders) {
        return res.status(404).json({ error: "Orders not found." });
      }
      res.status(200).json({ status: true, orders: orders });
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Get All Orders
   *
   */
  getAllOrders: async (req: Request, res: Response) => {
    try {
      const orders = await orderService.getAllOrders();
      if (orders) {
        return res.status(201).json({
          status: true,
          orders: orders,
        });
      } else {
        throw new Error("Something went wrong !");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /**
   *
   * Update Order
   *
   */
  updateOrder: async (req: NewOrderRequestBody<Omit<IOrder, "_id">>, res: Response) => {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(400).json({
          status: false,
          message: "Invalid OrderId.",
        });
      }

      const { ...orderData } = req.body;
      const result = await orderService.updateOrderById({ _id: orderId }, orderData);
      if (result) {
        return res.status(201).json({
          status: true,
          message: `Order updated.`,
        });
      } else {
        throw new Error("Something went wrong !");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /**
   *
   * Delete Order
   *
   */
  deleteOrder: async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(400).json({
          status: false,
          message: "Invalid OrderId.",
        });
      }

      const result = await orderService.deleteOrderById({ _id: orderId });
      if (result) {
        return res.status(201).json({
          status: true,
          message: `Order Deleted.`,
        });
      } else {
        throw new Error("Something went wrong !");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
