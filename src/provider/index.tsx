"use client";

import { FC, ReactNode } from "react";
import ChakraProvider from "./chakra";
import ReduxProviders from "./redux";

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProviders>
      <ChakraProvider>{children}</ChakraProvider>
    </ReduxProviders>
  );
};
