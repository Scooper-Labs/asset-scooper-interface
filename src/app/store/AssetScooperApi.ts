/**
 * *** @description baseURL is your endpoint url ***
 */
import { BASE_URL as baseUrl } from "@/utils/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { RootState } from "./store";

export const AssetScooperApi = createApi({
  reducerPath: "AssetScooperApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      //@ts-ignore
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
      //@ts-ignore
      return action.payload?.[reducerPath];
    }
  },

  tagTypes: [
    /**
     * *** @description where you name your endpoint tag name ***
     * e.g "User", "Comment", "Bold"
     */
  ],
  endpoints: (builder) => ({
    //your endpoints here.....
  }),
});

export const {} = AssetScooperApi;
