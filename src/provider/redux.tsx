"use client";
import { ProvidersProps } from "@/lib/components/types";
import { persistor, store } from "@/store/store";
import type { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";

const ReduxProviders: FC<ProvidersProps> = ({ children }) => {
  const cookieOptions = {
    path: "/",
    expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
  };

  return (
    <CookiesProvider defaultSetOptions={cookieOptions}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </ReduxProvider>
    </CookiesProvider>
  );
};

export default ReduxProviders;
