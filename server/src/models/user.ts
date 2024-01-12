import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
  refreshToken?: string;
}

const UserSchema = new Schema<IUser>({
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

export const User = mongoose.model<IUser>("User", UserSchema);
