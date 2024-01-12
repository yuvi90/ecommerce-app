import express from "express";
import ProfileController from "@src/controllers/userProfile.js";

const router = express.Router();

// Routes for profile-related operations
router.get("/:userId", ProfileController.getProfile);
router.put("/:userId", ProfileController.updateProfile);

export default router;
