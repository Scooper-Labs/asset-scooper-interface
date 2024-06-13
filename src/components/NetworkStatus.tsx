"use client";

import React from "react";
import { useBlockNumber, useAccount } from "wagmi";
import { GetNetworkColor } from "@/utils/network";
import { LinkComponent } from "./LinkComponent";
import { Box, Text, Flex, Badge } from "@chakra-ui/react";

export function NetworkStatus() {
  const block = useBlockNumber({ watch: true });
  const { chain } = useAccount();
  const explorerUrl = chain?.blockExplorers?.default.url;
  const networkName = chain?.name ?? "Ethereum";
  const color = GetNetworkColor(networkName, "bgVariant");

  return (
    <Flex alignItems="center">
      {/* <Badge className={color}>{networkName}</Badge> */}
      {explorerUrl ? (
        <LinkComponent href={explorerUrl}>
          <Text fontWeight={500} fontSize="xs" color={color}>
            {block.data?.toString()}
          </Text>
        </LinkComponent>
      ) : (
        <Text fontWeight={500} fontSize="xs" color={color}>
          {block.data?.toString()}
        </Text>
      )}
    </Flex>
  );
}
