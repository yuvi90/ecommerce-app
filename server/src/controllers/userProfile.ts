import { NextFunction, Request, Response } from "express";
import profileService from "../services/profileService.js";
import { IUserProfile } from "../models/userProfile.js";

interface TypedRequestBody<T> extends Request {
  body: T;
}

const ProfileController = {
  /**
   *
   * Create New Profile
   *
   */
  createNewProfile: async (
    req: TypedRequestBody<Partial<IUserProfile>>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userName = req.query.user as string;
      const { ...profileData } = req.body;

      if (
        !userName ||
        !profileData.name ||
        !profileData.address ||
        !profileData.address.street ||
        !profileData.address.city ||
        !profileData.address.state ||
        !profileData.address.country ||
        !profileData.address.zipCode
      ) {
        res.status(400).json({ status: false, message: "Incomplete fields." });
      }

      const result = await profileService.createUserProfile({ username: userName }, profileData);
      if (result) {
        return res.status(201).json({
          status: true,
          message: `Profile created.`,
        });
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Get Profile
   *
   */
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userName = req.query.user as string;
      if (!userName) {
        return res.status(400).json({
          status: false,
          message: "Invalid Username.",
        });
      }

      const userProfile = await profileService.findUserProfileByUsername({ username: userName });
      if (!userProfile) {
        return res.status(404).json({ error: "Profile not found." });
      }
      res.status(200).json({ status: true, userProfile: userProfile });
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Get All Profiles
   *
   */
  getAllProfiles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userProfiles = await profileService.getAll();
      if (!userProfiles) {
        return res.status(404).json({ error: "Profile not found." });
      }
      res.status(200).json({ userProfiles });
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Update Profile
   *
   */
  updateProfile: async (
    req: TypedRequestBody<Partial<IUserProfile>>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userName = req.query.user as string;
      const { ...profileData } = req.body;

      if (!userName) {
        res.status(400).json({ status: false, message: "Invalid Username." });
      }

      const result = await profileService.updateUserProfileByUserName(
        { username: userName },
        profileData,
      );

      if (result) {
        return res.status(201).json({
          status: true,
          message: `Profile updated.`,
        });
      } else {
        throw new Error("Something went wrong !");
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Delete Profile
   *
   */
  deleteProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userName = req.query.user as string;

      if (!userName) {
        res.status(400).json({ status: false, message: "Invalid Username." });
      }

      const result = await profileService.deleteUserProfileByUserName({ username: userName });
      if (result) {
        return res.status(201).json({
          status: true,
          message: `Profile deleted.`,
        });
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error) {
      next(error);
    }
  },
};

export default ProfileController;
