"use client";

import { FC, ReactNode } from "react";
import ChakraProvider from "./chakra";
import TokenListProvider from "./tokenListProvider";
import ApolloClientProvider from "./apolloProvider";
import Web3ModalAppKitProvider from "./web3Provider";
import { State } from "wagmi";

export const RootProvider = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) => {
  return (
    <Web3ModalAppKitProvider initialState={initialState}>
      <TokenListProvider>
        <ChakraProvider>
          <ApolloClientProvider>{children}</ApolloClientProvider>
        </ChakraProvider>
      </TokenListProvider>
    </Web3ModalAppKitProvider>
  );
};
