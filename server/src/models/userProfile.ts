import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUserProfile {
  userId: mongoose.Types.ObjectId;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };

  // Additional profile information
  avatar?: string;
  gender?: "male" | "female" | "others";
  dob?: Date | undefined;
  age?: number | undefined; // Virtual Attribute
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserProfileDocument extends Document, IUserProfile {}

const schema = new Schema<IUserProfileDocument>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, unique: true },
    name: {
      type: String,
      required: [true, "Please enter full name"],
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },

    // Additional profile information
    avatar: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Computing Virtual Age Attribute
schema.virtual("age").get(function () {
  if (this.dob) {
    const today = new Date();
    const dob: Date = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  }
});

export const UserProfile: Model<IUserProfileDocument> = mongoose.model<IUserProfileDocument>(
  "UserProfile",
  schema,
);
