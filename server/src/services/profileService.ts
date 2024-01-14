import { Model, FilterQuery } from "mongoose";
import { UserProfile, IUserProfile, IUserProfileDocument } from "../models/userProfile.js";
import { User, IUserDocument } from "../models/user.js";

class ProfileService {
  private userProfileModel: Model<IUserProfileDocument>;
  private userModel: Model<IUserDocument>;

  constructor(userProfileModel: Model<IUserProfileDocument>, userModel: Model<IUserDocument>) {
    this.userProfileModel = userProfileModel;
    this.userModel = userModel;
  }

  async createUserProfile(
    userId: string,
    profileData: Partial<IUserProfile>,
  ): Promise<IUserProfileDocument> {
    const userProfileData = { ...profileData, user: userId };
    return this.userProfileModel.create(userProfileData);
  }

  async findUserProfileByUserId(
    query: FilterQuery<IUserDocument>,
  ): Promise<IUserProfileDocument | null> {
    return this.userProfileModel.findOne(query._id).exec();
  }

  async findUserProfileByUsername(
    query: FilterQuery<IUserDocument>,
  ): Promise<IUserProfileDocument | null> {
    const user = await this.userModel.findOne(query.username).exec();
    return this.userProfileModel.findOne({ user: user?._id }).exec();
  }

  async updateUserProfileById(
    userId: string,
    updateData: Partial<IUserProfile>,
  ): Promise<IUserProfileDocument | null> {
    return this.userProfileModel
      .findOneAndUpdate({ user: userId }, updateData, { new: true })
      .exec();
  }
}

const profileService = new ProfileService(UserProfile, User);

export default profileService;
