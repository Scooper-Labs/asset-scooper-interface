"use client";

import { useTokenLists } from "@/hooks/useTokens";
import { Box, Button, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import tokenList from "@/constants/baseTokenList.json";
import TokenSelectListRow from "./token-select-row";
import { useBalances } from "@/hooks/balances/useBalances";
import { useAccount } from "wagmi";
import { base } from "viem/chains";
import { covalentClient } from "@/lib/covalent";
import { ChainID as CovalentChainID } from "@covalenthq/client-sdk";

function TokenSelectList() {
  // console.log("token list json", tokenList);
  // const vStackRef = useRef<HTMLDivElement | null>(null);
  // const [_height, setHeight] = useState(0);
  // const handleHeightCheck = () => {
  //   if (vStackRef.current) {
  //     const height = vStackRef.current.offsetHeight; // Access the height
  //     console.log("VStack height:", height);
  //     setHeight(height);
  //   } else {
  //     console.log("VStack ref not yet available");
  //   }
  // };

  // useEffect(() => {
  //   handleHeightCheck();
  // }, [vStackRef]);

  const { address } = useAccount();
  const addressMap = tokenList.map((token) => token.address);

  const { data, isFetching, isLoading, error, isError } = useBalances({
    tokens: tokenList,
    account: address ?? "0xE3c347cEa95B7BfdB921074bdb39b8571F905f6D",
  });
  console.log(
    "this is balance data",
    data,
    isFetching,
    isLoading,
    error,
    isError
  );

  // const getBalnces = async (account: string) => {
  //   const { data: balances } =
  //     await covalentClient.BalanceService.getTokenBalancesForWalletAddress(
  //       base.id as CovalentChainID,
  //       account
  //     );

  //   console.log("balance map", balances);
  // };

  // useEffect(() => {
  //   address && getBalnces(address);
  // }, [address]);
  return (
    <VStack
      borderTop="1px solid #F7E5F7"
      width="100%"
      height="341px"
      padding="1rem"
      overflowY="scroll"
      // ref={vStackRef}
      gap="12px"
    >
      {/* <Button onClick={handleHeightCheck}>{_height ? _height : "e"}</Button> */}
      {tokenList.map((token, i) => {
        return (
          <Box key={i} width="100%">
            <TokenSelectListRow token={token} />
          </Box>
        );
      })}
    </VStack>
  );
}

export default TokenSelectList;
