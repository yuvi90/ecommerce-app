import { Model, FilterQuery, UpdateQuery } from "mongoose";
import { User, IUser, IUserDocument } from "../models/user.js";
import { UserProfile } from "../models/userProfile.js";

class UserService {
  private userModel: Model<IUserDocument>;

  constructor(userModel: Model<IUserDocument>) {
    this.userModel = userModel;
  }
  async createUser(userObject: IUser): Promise<IUserDocument> {
    return this.userModel.create(userObject);
  }

  async findUsers(query: FilterQuery<IUserDocument> = {}): Promise<IUserDocument[]> {
    return this.userModel.find(query).exec();
  }

  async getUserById(id: string): Promise<IUserDocument | null> {
    return this.userModel.findById(id);
  }

  async getUserByProperty(query: FilterQuery<IUserDocument>): Promise<IUserDocument | null> {
    return this.userModel.findOne(query).exec();
  }

  async getUserByUsername(username: string): Promise<IUserDocument | null> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async getUserByEmail(email: string): Promise<IUserDocument | null> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async updateUserById(
    id: string,
    update: UpdateQuery<IUserDocument>,
  ): Promise<IUserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, update, { new: true });
  }

  async deleteUser(id: string): Promise<void> {
    const profileData = await UserProfile.findOne({ user: id });
    await profileData?.deleteOne();
    await this.userModel.findByIdAndDelete(id);
  }
}

const userService = new UserService(User);
export default userService;
