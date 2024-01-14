import mongoose, { Document, Schema, Model } from "mongoose";
import validator from "validator";

export interface IUser {
  username: string;
  password: string;
  email: string;
  role?: "admin" | "user";
  createdAt?: Date;
  refreshToken?: string;
}

export interface IUserDocument extends Document, IUser {}

const UserSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter username."],
    trim: true,
  },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter email"],
    trim: true,
    validate: validator.default.isEmail,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  refreshToken: { type: String },
});

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>("User", UserSchema);
