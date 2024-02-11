import express from "express";
import { OrdersController } from "../controllers/order.js";
import { adminOnly, authenticate } from "../middlewares/auth.js";

const router = express.Router();

// Apply authenticate middleware to all routes in the router
router.use(authenticate);

// Create New Order  - /api/order
router.post("/new", OrdersController.createOrder);

// Get User Orders - /api/order?user=
router.get("/", OrdersController.getUserOrders);

// Get All Orders  - /api/order/all
router.get("/all", adminOnly, OrdersController.getAllOrders);

// Get Single Order, Update Order, Remove Order - /api/order/:id
router.put("/:id", adminOnly, OrdersController.updateOrder);
router.delete("/:id", adminOnly, OrdersController.deleteOrder);

export default router;
