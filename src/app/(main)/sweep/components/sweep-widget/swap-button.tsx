import { TokenSelector } from "@/components/TokenSelector";
import {
  ChevronDownIcon,
  InfoOutlineIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { SwapSettings } from "./swap-settings";
import { COLORS } from "@/constants/theme";
import { useSelectedTokens } from "@/hooks/useSelectTokens";
import { useAccount } from "wagmi";
import { useWriteContracts } from "wagmi/experimental";
import { Address, erc20Abi } from "viem";
import { useWatchPendingTransactions } from "wagmi";
import { use1inchSwap } from "@/hooks/swap/use1inchSwap";
import { ChainId } from "@/constants";

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

  console.log(
    "swap data",
    tokensWithLiquidity,
    tokensWithNoLiquidity,
    swapCallDataArray,
  );

  return (
    <>
      {!isConnected ? (
        <Button>Connect wallet</Button>
      ) : (
        <>
          {selectedTokens.length > 0 ? (
            <Button onClick={fetchSwapData}>
              Swap {isLoading && "Swapp is Loading"}
            </Button>
          ) : (
            <>
              <Button>Select tokens</Button>
            </>
          )}
        </>
      )}
    </>
  );
}
// InfoOutlineIcon
export default SweepButton;
