"use client";

import { FC, ReactNode } from "react";
import ChakraProvider from "./chakra";
import ReduxProviders from "./redux";
<<<<<<< HEAD
=======
import { Web3Provider } from "./web3-provider";
>>>>>>> d8a93a91b2556175dfa3352b58f5baa7a72d5a60

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProviders>
<<<<<<< HEAD
      <ChakraProvider>{children}</ChakraProvider>
=======
      <ChakraProvider>
        <Web3Provider>{children}</Web3Provider>
      </ChakraProvider>
>>>>>>> d8a93a91b2556175dfa3352b58f5baa7a72d5a60
    </ReduxProviders>
  );
};
