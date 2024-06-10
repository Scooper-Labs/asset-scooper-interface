"use client";

import { ProvidersProps } from "@/lib/components/types";
import { persistor, store } from "@/store/store";
import type { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
// import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";
import { ChakraProvider } from "@chakra-ui/react";

const RootProviders: FC<ProvidersProps> = ({ children }) => {
  const cookieOptions = {
    path: "/",
    expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
  };

  return (
    <CookiesProvider defaultSetOptions={cookieOptions}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>{children}</ChakraProvider>
        </PersistGate>
      </ReduxProvider>
    </CookiesProvider>
  );
};

export default RootProviders;
