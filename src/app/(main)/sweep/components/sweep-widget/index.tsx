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

function SweepWidget() {
  return (
    <VStack gap="12px">
      <Flex justify="end" fontSize="small" width="100%">
        <HStack>
          <Button
            borderRadius="8px"
            background="linear-gradient(180deg, #FFFFFF 0%, #FAFCFC 100%)"
            border="1px solid #E1C9E1"
            _hover={{
              bg: "linear-gradient(180deg, #FFFFFF 0%, #FAFCFC 100%)",
            }}
            fontWeight={400}
            color="#917193"
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
            <Text>Sweep</Text>
            <Text fontSize="small">Update in 30 sec 1ETH ≈ 3800 USDC </Text>
          </Flex>
          <TokenSelector>
            <Flex
              width="100%"
              border="1px solid #E7BFE7"
              backgroundColor="#fff"
              justifyContent="space-between"
              padding="8px"
              fontSize="small"
              fontWeight="bold"
            >
              <Text>Select Tokens</Text>
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

            <Text>__</Text>
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

            <Text>__</Text>
          </Flex>

          <Button width="100%"> Connect Wallet</Button>
        </VStack>
      </VStack>
    </VStack>
  );
}

export default SweepWidget;
