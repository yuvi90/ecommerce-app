import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  thumbnail?: string;
  photos?: string[];
}

export interface IProductDocument extends Document, IProduct {}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    description: {
      type: String,
      required: [true, "Please enter description of the product"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter stock"],
    },
    category: {
      type: String,
      required: [true, "Please enter category"],
      trim: true,
    },
    thumbnail: {
      type: String,
    },
    photos: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Product: Model<IProductDocument> = mongoose.model<IProductDocument>(
  "Product",
  ProductSchema,
);
