import express from "express";
import { authenticate, adminOnly } from "../middlewares/auth.js";
import UserController from "../controllers/user.js";
import ProfileController from "../controllers/userProfile.js";

const router = express.Router();

// Apply authenticate middleware to all routes in the router
router.use(authenticate);

// Route - /api/user/all
router.get("/all", adminOnly, UserController.getAllUsers);

// Route - /api/user/profile/all
router.route("/profile/all").get(adminOnly, ProfileController.getAllProfiles);

// Route - /api/user/profile?user=
router.route("/profile").post(ProfileController.createNewProfile);

// Route - /api/user/profile?user=
router.route("/profile").get(ProfileController.getProfile);

// Route - /api/user/profile?user=
router.route("/profile").put(ProfileController.updateProfile);

// Route - /api/user/profile?user=
router.route("/profile").delete(ProfileController.deleteProfile);

// Route - /api/user/:id
router.route("/:id").get(UserController.getUser);

// Route - /api/user/:id
router.route("/:id").delete(adminOnly, UserController.deleteUser);

export default router;
