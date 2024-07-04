"use client";
import { ReactNode } from "react";
import AppNavbar from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";
import { Flex, Box } from "@chakra-ui/react";
interface MainAppLayoutProps {
  children: ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <>
      <Flex as="div" direction="column" minH="100vh">
        <AppNavbar />
        <Box flex="1">{children}</Box>
        <AppFooter />
      </Flex>
    </>
  );
};

export default MainAppLayout;
