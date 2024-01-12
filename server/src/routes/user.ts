import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

// Route - /api/user/new
app.post("/new", newUser);

// Route - /api/user/all
app.get("/all", adminOnly, getAllUsers);

// Route - /api/user/dynamicID
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);

export default app;
