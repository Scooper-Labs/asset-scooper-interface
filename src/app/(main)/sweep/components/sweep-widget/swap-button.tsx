import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useSelectedTokens } from "@/hooks/useSelectTokens";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { use1inchSwap } from "@/hooks/swap/use1inchSwap";
import { ChainId } from "@/constants";
import SwapModal from "../modals/swap";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import ApprovalModal from "../modals/approval";
import { useReadContracts } from "wagmi";
import { erc20Abi, Address } from "viem";

const spenderAddress = "0x111111125421ca6dc452d289314280a0f8842a65";

function SweepButton() {
  const { selectedTokens } = useSelectedTokens();

  const { isConnected, chainId, address } = useAccount();
  const contracts = selectedTokens.map((token) => ({
    abi: erc20Abi,
    address: token.address as Address,
    functionName: "allowance",
    args: [address, spenderAddress as Address], // You'll need to provide these
  }));

  const {data, isLoading} = useReadContracts({
    contracts,
  });

  const balancesMatch =
    data &&
   data.map((balance, index) => {
      const userBalance = selectedTokens[index].userBalance;
      return balance.toString() === userBalance.toString();
    });
    
  useEffect(() => {});

  return (
    <>
      {!isConnected ? (
        <Button>Connect wallet</Button>
      ) : (
        <>
          {selectedTokens.length > 0 ? (
            <>
              <Button width="100%" bg="#B5B4C6" color="#fff">
                Sweep
              </Button>
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
