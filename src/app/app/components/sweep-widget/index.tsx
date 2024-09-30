"use client";

import { TokenSelector } from "@/components/TokenSelector";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  Tag,
  TagLabel,
  Spinner,
  Skeleton,
  chakra,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { SwapSettings } from "./swap-settings";
import { COLORS } from "@/constants/theme";
import SweepButton from "./swap-button";
import { useRouter } from "next/navigation";
import { SweepIcon } from "@/assets/svg";
import OverlappingImage, { getImageArray } from "./ImageLap";
import { useAccount, useEstimateFeesPerGas } from "wagmi";
import { useWalletsPortfolio } from "@/hooks/useMobula";
import { useEthPrice } from "@/hooks/useGetETHPrice2";
import { ETH_ADDRESS } from "@/utils";
import CustomTooltip from "@/components/CustomTooltip";
import useSelectToken from "@/hooks/useSelectToken";
import { ETHToReceive } from "@/components/ETHToReceive";
import FormatNumber from "@/components/FormatNumber";

function SweepWidget() {
  const { address } = useAccount();
  const { tokenList: selectedTokens, clearList } = useSelectToken();
  const { data: estimateData, isLoading: isLoadingEstimateFee } =
    useEstimateFeesPerGas();

  const router = useRouter();

  const { refetch: refetchTokenBalance } = useWalletsPortfolio();

  const { isLoading, ethPrice } = useEthPrice({
    address: ETH_ADDRESS,
  });

  useEffect(() => {
    if (address === undefined) {
      clearList();
    }
  }, [address]);

  return (
    <VStack gap="12px">
      <Flex justify="end" fontSize="small" width="100%">
        <HStack>
          <Tag
            display={{ base: "flex", md: "none" }}
            size="lg"
            colorScheme="red"
            borderRadius="full"
          >
            <TagLabel>beta</TagLabel>
          </Tag>

          <Button
            fontWeight="500"
            bg={COLORS.btnBGGradient}
            borderRadius={10}
            fontSize="14px"
            color={COLORS.tabTextColor}
            shadow="small"
            border="1px solid #B190EB"
            onClick={() => {
              refetchTokenBalance();
              router.refresh();
              clearList();
            }}
            _hover={{
              bg: `${COLORS.btnBGGradient}`,
            }}
          >
            Refresh
          </Button>
          <SwapSettings />
        </HStack>
      </Flex>

      {/* ----------- mainbox ---------- */}
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
            src="/image/ConvertArt.svg"
          />
        </Box>

        <VStack as={"div"} width="100%" gap="2px">
          <Flex width="100%" justify="space-between">
            <Flex gap="6px" alignItems="center">
              <SweepIcon />
              <Text
                fontWeight={500}
                fontSize={{ base: "13px", md: "14px" }}
                color="#281629"
              >
                Sweep
              </Text>
            </Flex>
            <chakra.span fontSize="12px" color="#9E829F">
              {isLoading ? (
                <Skeleton
                  height="3em"
                  width="200px"
                  startColor="#E7BFE7"
                  endColor="#9E829F"
                  speed={1.2}
                  fadeDuration={0.5}
                />
              ) : (
                `Update in 5min 1 ETH(WETH) ≈ ${ethPrice} USDC`
              )}
            </chakra.span>
          </Flex>
          {/* -------------------- Token Selector is here ------------------- */}
          <TokenSelector>
            <Flex
              width="100%"
              border={`1px solid ${
                selectedTokens?.length === 0 ? "#E7BFE7" : "#0F04D7"
              }`}
              backgroundColor="#fff"
              justifyContent="space-between"
              padding="16px 12px"
              fontSize="small"
              fontWeight="bold"
              borderRadius="6px"
              alignItems="center"
            >
              {selectedTokens?.length > 0 ? (
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
          as={"div"}
          fontSize="small"
          width="100%"
          borderTop="1px solid #F7E5F7"
          paddingTop="24px"
        >
          <Flex width="100%" justifyContent="space-between">
            <Flex alignItems="center" gap="4px">
              <Text
                fontSize="14px"
                fontWeight={500}
                color={COLORS.tabTextColor}
              >
                You will receive
              </Text>
              <CustomTooltip label="Estimated Total Value you will receive in ETH(WETH)">
                <AiOutlineQuestionCircle color="#C9BCCA" />
              </CustomTooltip>
            </Flex>

            <ETHToReceive selectedTokens={selectedTokens} />
          </Flex>

          <Flex width="100%" justifyContent="space-between">
            <Flex alignItems="center" gap="4px">
              <Text
                fontSize="14px"
                fontWeight={500}
                color={COLORS.tabTextColor}
              >
                Max fee per gas
              </Text>
              <CustomTooltip label="Maximum amount you're willing to pay per unit of gas for this transaction.">
                <AiOutlineQuestionCircle color="#C9BCCA" />
              </CustomTooltip>
            </Flex>

            {isLoadingEstimateFee ? (
              <Skeleton
                height="2em"
                width="100px"
                startColor="#E7BFE7"
                endColor="#9E829F"
                speed={1.2}
                fadeDuration={0.5}
              />
            ) : (
              <Text>
                <FormatNumber
                  //@ts-ignore
                  amount={estimateData ? estimateData.maxFeePerGas : "__"}
                  suf="ETH"
                />
              </Text>
            )}
          </Flex>

          <Flex width="100%" justifyContent="space-between">
            <Flex alignItems="center" gap="4px">
              <Text
                fontSize="14px"
                fontWeight={500}
                color={COLORS.tabTextColor}
              >
                Estimated transaction time
              </Text>
              <CustomTooltip label="Estimated time taken for this transaction to be completed.">
                <AiOutlineQuestionCircle color="#C9BCCA" />
              </CustomTooltip>
            </Flex>

            <Text>3 seconds</Text>
          </Flex>
          {/* -------------------- Connect Button & Sweep Button is here ------------------- */}
          <SweepButton />
        </VStack>
      </VStack>
    </VStack>
  );
}
export default SweepWidget;
