import { Request, Response, NextFunction } from "express";
import userService from "../services/useService.js";

const UserController = {
  // Get all users
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.findUsers();
      if (users) {
        return res.status(200).json({
          status: true,
          users,
        });
      } else {
        throw new Error("Something went wrong !");
      }
    } catch (error) {
      next(error);
    }
  },

  // Get single user
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Invalid Id",
        });
      }
      const user = await userService.getUserById(id);

      if (!user)
        return res.status(400).json({
          status: false,
          message: "Invalid Id",
        });

      return res.status(200).json({
        status: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete user
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Invalid Id",
        });
      }
      await userService.deleteUser(id);
      return res.status(200).json({
        status: true,
        message: "Deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
export default UserController;
