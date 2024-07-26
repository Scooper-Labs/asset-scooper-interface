"use client";

import React from "react";
import ContainerWrapper from "@/components/ContainerWrapper";
import { Box, Flex, Text } from "@chakra-ui/react";
import SweepWidget from "./components/sweep-widget";
import { useBalances } from "@/hooks/balances/useBalances";

const Sweep: React.FC = () => {
  const { serializedBalance, data, isError, isLoading, error } = useBalances({
    address: "0x26DDD68E8650A6cd11f6D47fa48c704A3b174a3D",
  });

  console.log(
    "data moralizzzz abeg",
    data?.result,
    isError,
    isLoading,
    error,
    "serializedBalance",
    serializedBalance
  );

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
