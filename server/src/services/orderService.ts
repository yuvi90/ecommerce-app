import { Model, FilterQuery, UpdateQuery } from "mongoose";
import { User, IUserDocument } from "../models/user.js";
import { UserProfile, IUserProfileDocument } from "../models/userProfile.js";
import { Product, IProductDocument } from "../models/product.js";
import { Order, IProduct, IOrder, IOrderDocument } from "../models/order.js";

const reduceStock = async (orderItems: IProduct[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;
    await product.save();
  }
};

class OrderService {
  private userModel: Model<IUserDocument>;
  private userProfileModel: Model<IUserProfileDocument>;
  private productModel: Model<IProductDocument>;
  private orderModel: Model<IOrderDocument>;

  constructor(
    userModel: Model<IUserDocument>,
    userProfileModel: Model<IUserProfileDocument>,
    productModel: Model<IProductDocument>,
    orderModel: Model<IOrderDocument>,
  ) {
    this.userModel = userModel;
    this.userProfileModel = userProfileModel;
    this.productModel = productModel;
    this.orderModel = orderModel;
  }

  async createOrder(orderData: Partial<IOrder>): Promise<IOrderDocument | null> {
    const user = await this.userModel.findOne({ username: orderData.customerUserName });
    if (user) {
      await reduceStock(orderData.products!);
      return this.orderModel.create(orderData);
    } else {
      return null;
    }
  }

  async getOrderbyUserName(query: FilterQuery<IOrderDocument>): Promise<IOrderDocument[] | null> {
    return this.orderModel.find(query).exec();
  }

  async getAllOrders(): Promise<IOrderDocument[] | null> {
    return this.orderModel.find({}).sort({ createdAt: 1 }).select("-__v").exec();
  }

  async updateOrderById(
    query: FilterQuery<IOrderDocument>,
    update: UpdateQuery<IOrderDocument>,
  ): Promise<IOrderDocument | null> {
    return this.orderModel.findOneAndUpdate(query, update, { new: true });
  }

  async deleteOrderById(query: FilterQuery<IOrderDocument>): Promise<IOrderDocument | null> {
    return this.orderModel.findOneAndDelete(query);
  }
}

const orderService = new OrderService(User, UserProfile, Product, Order);

export default orderService;
