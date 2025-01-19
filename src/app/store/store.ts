"use client";

import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PERSIST, PURGE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";
// import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AssetScooperApi } from "./AssetScooperApi";
import rootReducers from "./rootReducers";

export interface CallbackProps {
  onSuccess?: Function;
  onError?: Function;
}

export function createPersistStorage(): WebStorage {
  const isServer = typeof window === "undefined";
  // Returns noop (dummy) storage.
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  //@ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      thunk: true,
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE],
        warnAfter: 128,
      },
    }).concat(AssetScooperApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
