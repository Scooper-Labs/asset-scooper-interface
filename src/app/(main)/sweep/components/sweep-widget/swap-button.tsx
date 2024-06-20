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

function SweepWidget() {
  const { isSelected, _selectToken, _unSelectToken, selectedTokens } =
    useSelectedTokens();

  const { isConnected } = useAccount();

  return (
    <>
      {!isConnected ? (
        <Button>Connect wallet</Button>
      ) : (
        <>
          {selectedTokens.length > 0 ? (
            <Button>Swap</Button>
          ) : (
            <Button>Select tokens</Button>
          )}
        </>
      )}
    </>
  );
}
// InfoOutlineIcon
export default SweepWidget;
