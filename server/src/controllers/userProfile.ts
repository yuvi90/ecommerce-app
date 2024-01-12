import { Request, Response } from "express";
import { UserProfile } from "@src/models/userProfile.js";

const ProfileController = {
  getProfile: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      // Find the user profile by user_id
      const userProfile: UserProfile | null = await UserProfile.findOne({ user_id: userId });

      if (!userProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.status(200).json({ userProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateProfile: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      // Update user profile based on the request body
      const updatedProfile: UserProfile | null = await UserProfile.findOneAndUpdate(
        { user_id: userId },
        req.body,
        { new: true },
      );

      if (!updatedProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.status(200).json({ updatedProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default ProfileController;
