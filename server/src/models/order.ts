import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct {
  productId: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  customerName: string;
  customerUserName: string;
  shippingInfo: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  products: IProduct[];
  status: string;
  totalAmount: number;
}

export interface IOrderDocument extends Document, IOrder {}

const OrderSchema = new Schema<IOrderDocument>(
  {
    customerName: {
      type: String,
      required: [true, "Please enter customer name."],
    },
    customerUserName: {
      type: String,
      required: [true, "Please provide a customer username."],
    },
    shippingInfo: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: [true, "Please provide a product ID."],
        },
        name: {
          type: String,
          required: [true, "Please enter product name."],
        },
        quantity: {
          type: Number,
          required: [true, "Please enter product quantity."],
          min: [1, "Product quantity must be at least 1."],
        },
        price: {
          type: Number,
          required: [true, "Please enter product price."],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Please enter total amount."],
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  },
);

export const Order: Model<IOrderDocument> = mongoose.model<IOrderDocument>("Order", OrderSchema);
