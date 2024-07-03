"use client";

import React from "react";
import ContainerWrapper from "@/components/ContainerWrapper";
import { Box, Flex, Text } from "@chakra-ui/react";
import SweepWidget from "./components/sweep-widget";

const Sweep: React.FC = () => {
  return (
    <ContainerWrapper>
      <Flex
        pt={"6rem"}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <SweepWidget />
      </Flex>
    </ContainerWrapper>
  );
};

export default Sweep;
