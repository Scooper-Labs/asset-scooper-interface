import { BASE_URL as baseUrl } from "@/utils/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { REHYDRATE } from "redux-persist";

export enum Request {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
}

interface RehydrateAction {
  type: typeof REHYDRATE;
  payload?: {
    [key: string]: any;
  };
}

export const ScooperApi = createApi({
  reducerPath: "ScooperApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.app_jwt;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    // when persisting the root reducer
    if (action.type === REHYDRATE) {
      const payload = action.payload as Record<string, any>;
      return payload?.[reducerPath];
    }
  },

  tagTypes: [],
  endpoints: (builder) => ({}),
});

export const {} = ScooperApi;
