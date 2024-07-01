"use client";

import { TokenSelector } from "@/components/TokenSelector";
import { ChevronDownIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
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
import { Token } from "@/lib/components/types";

export function ETHToReceive({ selectedTokens }: { selectedTokens: Token[] }) {
  const { price } = useGetETHPrice();
  const quoteAllTokens = selectedTokens.reduce(
    (total, selectedToken) => total + selectedToken.quoteUSD,
    0
  );

  return (
    <>
      {price === 0 ? (
        "__"
      ) : (
        <FormatNumber amount={quoteAllTokens / price} suf="ETH" />
      )}
    </>
  );
}

function SweepWidget() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedTokens } = useSelectedTokens();
  const { price } = useGetETHPrice();

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
                  <Text fontSize="14px" fontWeight="500" color="#2C333B">
                    {" "}
                    {selectedTokens.length} tokens selected
                  </Text>
                </Flex>
              ) : (
                <Text color="#2C333B" fontWeight={500} fontSize={14}>
                  Select Tokens
                </Text>
              )}
              <ChevronDownIcon color="#001423" fontSize="16px" />
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

            <ETHToReceive selectedTokens={selectedTokens} />
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
