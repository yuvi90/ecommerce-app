import express from "express";
import { OrdersController } from "../controllers/order.js";
import { adminOnly, authenticate } from "../middlewares/auth.js";

const router = express.Router();

// Create New Order  - /api/order
router.post("/new", authenticate, OrdersController.createOrder);

// Get All My Orders - /api/order/my

// Get All Orders  - /api/order
router.get("/all", authenticate, adminOnly, OrdersController.getAllOrders);

// Get Single Order, Update Order, Remove Order - /api/order/:id

export default router;
