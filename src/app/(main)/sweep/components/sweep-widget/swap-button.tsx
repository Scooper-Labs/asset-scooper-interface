import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useSelectedTokens } from "@/hooks/useSelectTokens";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { use1inchSwap } from "@/hooks/swap/use1inchSwap";
import { ChainId } from "@/constants";
import ApprovalModal from "../modals/approval";
import SwapModal from "../modals/swap";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

function SweepButton() {
  const { isSelected, _selectToken, _unSelectToken, selectedTokens } =
    useSelectedTokens();
  const { isConnected, chainId, address } = useAccount();

  const {
    fetchSwapData,
    isLoading,
    tokensWithLiquidity,
    tokensWithNoLiquidity,
    swapCallDataArray,
  } = use1inchSwap(chainId as ChainId, address);

  useEffect(() => {});

  return (
    <>
      {!isConnected ? (
        <Button>Connect wallet</Button>
      ) : (
        <>
          {selectedTokens.length > 0 ? (
            <>
              <ApprovalModal />
              <SwapModal />
            </>
          ) : (
            <>
              <Button width="100%" bg="#B5B4C6" color="#fff">
                Select tokens
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}
// InfoOutlineIcon
export default SweepButton;
