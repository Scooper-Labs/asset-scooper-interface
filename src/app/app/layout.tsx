"use client";
import { ReactNode } from "react";
import AppNavbar from "@/components/AppLayout/Navbar";
import { AppFooter } from "@/components/AppLayout/Footer";
import { Flex, Box } from "@chakra-ui/react";
import { StateContextProvider } from "@/provider/AppProvider";

interface MainAppLayoutProps {
  children: ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <StateContextProvider>
      <Flex as="div" direction="column" minH="100vh">
        <AppNavbar />
        <Box flex="1" overflow="auto">
          {children}
        </Box>
        <AppFooter />
      </Flex>
    </StateContextProvider>
  );
};

export default MainAppLayout;
