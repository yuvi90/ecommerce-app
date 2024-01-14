import express from "express";
import { authenticate, adminOnly } from "../middlewares/auth.js";
import UserController from "../controllers/user.js";
import ProfileController from "../controllers/userProfile.js";

const router = express.Router();

// Apply authenticate middleware to all routes in the router
router.use(authenticate);

// Route - /api/user/all
router.get("/all", adminOnly, UserController.getAllUsers);

// Route - /api/user/:id
router.route("/:id").get(UserController.getUser);

// Route - /api/user/:id
router.route("/:id").delete(adminOnly, UserController.deleteUser);

// Route - /api/user/:id/profile
router.route("/:id/profile").post(ProfileController.createNewProfile);

// Route - /api/user/:id/profile
router.route("/:id/profile").get(ProfileController.getProfile);

export default router;
