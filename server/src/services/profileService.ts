import { Model, FilterQuery, UpdateQuery } from "mongoose";
import { User, IUserDocument } from "../models/user.js";
import { UserProfile, IUserProfile, IUserProfileDocument } from "../models/userProfile.js";

class ProfileService {
  private userModel: Model<IUserDocument>;
  private userProfileModel: Model<IUserProfileDocument>;

  constructor(userModel: Model<IUserDocument>, userProfileModel: Model<IUserProfileDocument>) {
    this.userModel = userModel;
    this.userProfileModel = userProfileModel;
  }

  async getAll(): Promise<IUserProfileDocument[] | null> {
    return this.userProfileModel.find({}).exec();
  }

  async createUserProfile(
    query: FilterQuery<IUserDocument>,
    profileData: Partial<IUserProfile>,
  ): Promise<IUserProfileDocument | null> {
    const user = await this.userModel.findOne(query).exec();
    if (user) {
      const userProfileData = { ...profileData, userId: user._id };
      return this.userProfileModel.create(userProfileData);
    } else {
      return null;
    }
  }

  async findUserProfileByUsername(
    query: FilterQuery<IUserDocument>,
  ): Promise<IUserProfileDocument | null> {
    const user = await this.userModel.findOne(query).exec();
    if (user) {
      return this.userProfileModel.findOne({ userId: user._id }).select("-userId -_id -__v").exec();
    } else {
      return null;
    }
  }

  async updateUserProfileByUserName(
    query: FilterQuery<IUserDocument>,
    updateData: UpdateQuery<IUserProfileDocument>,
  ): Promise<IUserProfileDocument | null> {
    const user = await this.userModel.findOne(query).exec();
    if (user) {
      return this.userProfileModel
        .findOneAndUpdate({ userId: user._id }, updateData, { new: true })
        .exec();
    } else {
      return null;
    }
  }

  async deleteUserProfileByUserName(
    query: FilterQuery<IUserDocument>,
  ): Promise<IUserProfileDocument | null> {
    const user = await this.userModel.findOne(query).exec();
    if (user) {
      return this.userProfileModel.findOneAndDelete({ userId: user._id }).exec();
    } else {
      return null;
    }
  }
}

const profileService = new ProfileService(User, UserProfile);

export default profileService;
