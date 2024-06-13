"use client";

import { FC, ReactNode } from "react";
import ChakraProvider from "./chakra";
import ReduxProviders from "./redux";
import { Web3Provider } from "./web3-provider";

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProviders>
      <ChakraProvider>
        <Web3Provider>{children}</Web3Provider>
      </ChakraProvider>
    </ReduxProviders>
  );
};
