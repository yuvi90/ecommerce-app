import { api } from "../../redux/api/api";
import { MessageResponse } from "../../types/api-types";

// Types
export interface UserProfile {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  avatar?: string;
  gender?: "male" | "female" | "others";
  dob?: Date;
  age?: number;
}

export const userProfileAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query<{ status: boolean; userProfile: UserProfile }, string>({
      query: (username) => ({
        url: `/api/user/profile?user=${username}`,
      }),
    }),
    newProfile: builder.mutation<MessageResponse, { username: string; profileData: UserProfile }>({
      query: ({ username, profileData }) => ({
        url: `/api/user/profile?user=${username}`,
        method: "POST",
        body: { ...profileData },
      }),
    }),
  }),
});

export const { useUserProfileQuery, useNewProfileMutation } = userProfileAPI;
