"use client";

import { FC, ReactNode } from "react";
import ChakraProvider from "./chakra";
import TokenListProvider from "./tokenListProvider";
import ApolloClientProvider from "./apolloProvider";
import Web3ModalAppKitProvider from "./web3Provider";

import RainbowKitProvider from "@/config/switchchain/rainbowkit";

import { store } from "@/app/store/store";
import { Provider as ReduxProvider } from "react-redux";

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
      <ReduxProvider store={store}>
        <TokenListProvider>
          <ChakraProvider>
            <ApolloClientProvider>{children}</ApolloClientProvider>
          </ChakraProvider>
        </TokenListProvider>
      </ReduxProvider>
    </Web3ModalAppKitProvider>
  );
};
