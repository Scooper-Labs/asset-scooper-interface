"use client";
import { ReactNode } from "react";
import AppNavbar from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SUBGRAPH } from "@/constants";

const client = new ApolloClient({
  uri: SUBGRAPH,
  cache: new InMemoryCache(),
});

interface MainAppLayoutProps {
  children: ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <AppNavbar />
      {children}
      <AppFooter />
    </ApolloProvider>
  );
};

export default MainAppLayout;
