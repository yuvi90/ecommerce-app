import { api } from "../api/api";

export interface User {
  status: boolean;
  users: {
    username: string;
    password: string;
    email: string;
    role?: "admin" | "user";
    createdAt?: Date;
    refreshToken?: string;
  }[];
}

export const userAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User, void>({
      query: () => "/api/user/all",
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUsersQuery } = userAPI;
