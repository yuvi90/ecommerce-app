import { NextFunction, Request, Response } from "express";
import profileService from "../services/profileService.js";
import { IUserProfile } from "../models/userProfile.js";

interface TypedRequestBody<T> extends Request {
  body: T;
}

const ProfileController = {
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({
          status: false,
          message: "Invalid Id",
        });
      }

      // Find the user profile by user_id
      const userProfile = await profileService.findUserProfileByUserId({ user: userId });

      if (!userProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.status(200).json({ userProfile });
    } catch (error) {
      next(error);
    }
  },

  createNewProfile: async (
    req: TypedRequestBody<Partial<IUserProfile>>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.params.id;
      const { ...profileData } = req.body;

      if (
        !userId ||
        !profileData.name ||
        !profileData.address ||
        !profileData.address.city ||
        !profileData.address.state ||
        !profileData.address.street ||
        !profileData.address.zip
      ) {
        res.status(400).json({ status: false, message: "Incomplete fields !" });
      }

      const result = await profileService.createUserProfile(userId, profileData);

      // Send Response
      if (result) {
        return res.status(201).json({
          status: true,
          success: `Profile created!`,
        });
      } else {
        throw new Error("Something went wrong !");
      }
    } catch (error) {
      next(error);
    }
  },
};

export default ProfileController;
