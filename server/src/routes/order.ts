import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  allOrders,
  deleteOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  processOrder,
} from "../controllers/order.js";

const app = express.Router();

// route - /api/order/new
app.post("/new", newOrder);

// route - /api/order/my
app.get("/my", myOrders);

// route - /api/order/my
app.get("/all", adminOnly, allOrders);

app.route("/:id").get(getSingleOrder).put(adminOnly, processOrder).delete(adminOnly, deleteOrder);

export default app;
