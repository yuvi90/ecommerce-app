import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface AuthState {
  user: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: string; accessToken: string }>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authReducer.actions;

export const selectCurrentUser = (state: RootState) => state.authReducer.user;
export const selectCurrentToken = (state: RootState) => state.authReducer.token;
