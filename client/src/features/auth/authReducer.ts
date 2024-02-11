import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface AuthState {
  user: string | null;
  isAdmin: boolean;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  isAdmin: false,
  token: null,
};

export const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: string; isAdmin: boolean; accessToken: string }>,
    ) => {
      const { user, isAdmin, accessToken } = action.payload;
      state.user = user;
      state.isAdmin = isAdmin;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.isAdmin = false;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authReducer.actions;

export const selectCurrentUser = (state: RootState) => state.authReducer.user;
export const isCurrentUserAdmin = (state: RootState) => state.authReducer.isAdmin;
export const selectCurrentToken = (state: RootState) => state.authReducer.token;
