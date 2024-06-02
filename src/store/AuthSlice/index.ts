import storage from "redux-persist/lib/storage";
import { BASE_URL as baseUrl } from "@/utils/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialStateProps } from "./authSlice.types";
import { RootState } from "../store";

const initialState = {
  id: null,
  app_jwt: "",
  email: null,
  is_loading: false,
  error: false,
  error_msg: null,
  login_response: null,
  current_user_devices: [],
} as InitialStateProps;


export const AuthSlice = createSlice({
  name: "scooper_login",
  initialState,
  reducers: {
    STORE_JWT: (state, { payload }: PayloadAction<string>) => {
      // console.log(payload, "AUTH TOOKS");

      state.app_jwt = payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(LOGIN_FN.pending, (state) => {
    //   state.is_loading = true;
    // });

    // builder.addCase(LOGIN_FN.fulfilled, (state, { payload }) => {
    //   state.app_jwt = payload;
    //   state.is_loading = false;
    // });

    // builder.addCase(LOGIN_FN.rejected, (state, { error }) => {
    //   state.is_loading = false;
    //   state.error = true;
    // });
  },
});

export const { STORE_JWT } = AuthSlice.actions;

export const AuthSelector = (state: RootState) => state.authReducer;

export default AuthSlice.reducer;
