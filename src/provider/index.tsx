"use client";

import { FC, ReactNode } from "react";
import ChakraProvider from "./chakra";
import TokenListProvider from "./tokenListProvider";
import ApolloClientProvider from "./apolloProvider";

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TokenListProvider>
      <ChakraProvider>
        <ApolloClientProvider>
          {children}
        </ApolloClientProvider>
      </ChakraProvider>
    </TokenListProvider>
  );
};
