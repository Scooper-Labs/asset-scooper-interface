"use client";

import { FC, ReactNode } from "react";
import ChakraProvider from "./chakra";
import ReduxProviders from "./redux";
import ApolloClientProvider from "./apolloProder";

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProviders>
      <ChakraProvider><ApolloClientProvider>{children}</ApolloClientProvider></ChakraProvider>
    </ReduxProviders>
  );
};
