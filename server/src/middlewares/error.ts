import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";

// Error Middleware
export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.name === "CastError") err.message = "Invalid ID";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

// TryCatch Wrapper
export const TryCatch =
  (func: ControllerType) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
