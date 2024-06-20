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

  const { address } = useAccount();

  const dataBalances = useBalances({
    account: address ?? "0xE3c347cEa95B7BfdB921074bdb39b8571F905f6D",
  });
  console.log(
    "this is balance data",
    dataBalances,
    // data?.data.items,
    // isFetching,
    // isLoading,
    // error,
    // isError,
  );


  useEffect(() => {}, []);
 
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
      {dataBalances.map((token, i) => {
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
