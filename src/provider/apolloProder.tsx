"use client";

import { ProvidersProps } from "@/lib/components/types";
import type { FC } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SUBGRAPH } from "@/constants";

const client = new ApolloClient({
  uri: SUBGRAPH,
  cache: new InMemoryCache(),
});
const ApolloClientProvider: FC<ProvidersProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
