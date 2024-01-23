import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth";

// Types
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
interface refreshResponse {
  status: boolean;
  accessToken: string;
}

// Base Query
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER,
  credentials: "include",
  prepareHeaders: (headers, api) => {
    const token = (api.getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Wrapper around base query for refreshing access token
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // Initial Request
  let result = await baseQuery(args, api, extraOptions);
  // If status is forbidden send refresh token to get new access token
  if (result.error && result.error.status === 403) {
    // try to get a new token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user;
      const resultData = refreshResult.data as refreshResponse;
      if (user && resultData.status) {
        // store the new token
        api.dispatch(setCredentials({ user: user, accessToken: resultData.accessToken }));
      }
      // retry the initial query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "rootApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
