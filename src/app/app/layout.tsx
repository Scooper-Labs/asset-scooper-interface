"use client";
import { ReactNode } from "react";
import AppNavbar from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { Flex, Box } from "@chakra-ui/react";
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
      <Flex as="div" direction="column" minH="100vh">
        <AppNavbar />
        <Box flex="1">{children}</Box>
        <AppFooter />
      </Flex>
    </ApolloProvider>
  );
};

export default MainAppLayout;
