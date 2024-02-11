import { api } from "../../redux/api/api";
import { MessageResponse } from "../../types/api-types";

// Types
interface LoginResponse {
  status: boolean;
  role: string;
  accessToken: string;
}
interface LoginBody {
  user: string;
  pwd: string;
}
interface RegisterBody {
  email: string;
  user: string;
  pwd: string;
}

export const authAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<MessageResponse, RegisterBody>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation<LoginResponse, LoginBody>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.query<void, void>({
      query: () => ({
        url: "/auth/logout",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLazyLogoutQuery } = authAPI;
