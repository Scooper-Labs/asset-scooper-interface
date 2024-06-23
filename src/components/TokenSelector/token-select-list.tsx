import { Box, Button, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import TokenSelectListRow from "./token-select-row";
import { useBalances } from "@/hooks/balances/useBalances";
import { useAccount } from "wagmi";
import { useAppSelector } from "@/hooks/rtkHooks";
import { RootState } from "@/store/store";

function TokenSelectList() {
  const { address } = useAccount();

  const xxx = useBalances({
    account: address ?? "0xE3c347cEa95B7BfdB921074bdb39b8571F905f6D",
  });

  useEffect(() => {}, []);
  const userWalletTokens = useAppSelector(
    (state: RootState) => state.SweepTokensSlice.userWalletTokens,
  );

  console.log("this is balance data", userWalletTokens);

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
      {userWalletTokens?.map((token, i) => {
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
