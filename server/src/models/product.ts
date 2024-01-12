import mongoose from "mongoose";

interface IProduct {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: number;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter photo"],
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
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model<IProduct>("Product", schema);
