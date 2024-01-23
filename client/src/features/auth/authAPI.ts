import { api } from "../../redux/api/api";

// Types
interface LoginResponse {
  status: boolean;
  accessToken: string;
}
interface LoginBody {
  user: string;
  pwd: string;
}

export const authAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginBody>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;
