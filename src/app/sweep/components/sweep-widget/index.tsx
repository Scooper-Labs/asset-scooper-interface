"use client";

import { TokenSelector } from "@/components/TokenSelector";
import {
  ChevronDownIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { SwapSettings } from "./swap-settings";
import { COLORS } from "@/constants/theme";
import { useSelectedTokens } from "@/hooks/useSelectTokens";
import SweepButton from "./swap-button";
import { useRouter } from "next/navigation";
import { SweepIcon } from "@/assets/svg";
import OverlappingImage, { getImageArray } from "./ImageLap";
import useGetETHPrice from "@/hooks/useGetETHPrice";
import FormatNumber from "@/components/FormatNumber";

function SweepWidget() {
  const { selectedTokens } = useSelectedTokens();
  const { price } = useGetETHPrice();

  const quoteAllTokens = selectedTokens.reduce(
    (total, selectedToken) => total + selectedToken.quoteUSD,
    0
  );

  const router = useRouter();

  return (
    <VStack gap="12px">
      <Flex justify="end" fontSize="small" width="100%">
        <HStack>
          <Button
            fontWeight="500"
            bg={COLORS.btnBGGradient}
            borderRadius={10}
            color={COLORS.tabTextColor}
            shadow="small"
            border="1px solid #B190EB"
            onClick={() => router.refresh()}
            _hover={{
              bg: `${COLORS.btnBGGradient}`,
            }}
          >
            Refresh
          </Button>
          <SwapSettings />
        </HStack>
      </Flex>

      {/* mainbox */}
      <VStack
        border="1px solid #E1C9E1"
        padding="16px"
        borderRadius="12px"
        gap="16px"
      >
        <Box>
          <Image
            width={428}
            height={118}
            alt="Swap tokens Art"
            src="/images/ConvertArt.svg"
          />
        </Box>

        <VStack width="100%" gap="2px">
          <Flex width="100%" justify="space-between">
            <Flex gap="6px" alignItems="center">
              <SweepIcon />
              <Text>Sweep</Text>
            </Flex>
            <Text fontSize="small" color="#9E829F">
              Update in 30 sec 1ETH ≈ {price} USDC{" "}
            </Text>
          </Flex>
          <TokenSelector>
            <Flex
              width="100%"
              border={`1px solid ${
                selectedTokens.length === 0 ? "#E7BFE7" : "#0F04D7"
              }`}
              backgroundColor="#fff"
              justifyContent="space-between"
              padding="16px 12px"
              fontSize="small"
              fontWeight="bold"
              borderRadius="6px"
              alignItems="center"
            >
              {selectedTokens.length > 0 ? (
                <Flex alignItems="center" gap="6px">
                  <OverlappingImage
                    imageArray={getImageArray(selectedTokens)}
                  />
                  <Text> {selectedTokens.length} tokens selected</Text>
                </Flex>
              ) : (
                <Text color="#2C333B" fontWeight={500} fontSize={14}>
                  Select Tokens
                </Text>
              )}
              <ChevronDownIcon />
            </Flex>
          </TokenSelector>
        </VStack>

        <VStack
          fontSize="small"
          width="100%"
          borderTop="1px solid #F7E5F7"
          paddingTop="24px"
        >
          <Flex width="100%" justifyContent="space-between">
            <Flex alignItems="center" gap="4px">
              <Text>You will receive..</Text>
              <InfoOutlineIcon />
            </Flex>

            <Text>
              {price === 0 ? (
                "__"
              ) : (
                <FormatNumber amount={quoteAllTokens / price} suf="ETH" />
              )}
            </Text>
          </Flex>

          <Flex width="100%" justifyContent="space-between">
            <Flex alignItems="center" gap="4px">
              <Text>Transaction fee..</Text>
              <InfoOutlineIcon />
            </Flex>

            <Text>__</Text>
          </Flex>

          <Flex width="100%" justifyContent="space-between">
            <Flex alignItems="center" gap="4px">
              <Text>Estimated transaction time...</Text>
              <InfoOutlineIcon />
            </Flex>

            <Text>3 seconds</Text>
          </Flex>

          <SweepButton />
        </VStack>
      </VStack>
    </VStack>
  );
}
// InfoOutlineIcon
export default SweepWidget;
