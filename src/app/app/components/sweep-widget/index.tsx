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
  useDisclosure,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useContext } from "react";
import { SwapSettings } from "./swap-settings";
import { COLORS } from "@/constants/theme";
import SweepButton from "./swap-button";
import { useRouter } from "next/navigation";
import { SweepIcon } from "@/assets/svg";
import OverlappingImage, { getImageArray } from "./ImageLap";
import useGetETHPrice from "@/hooks/useGetETHPrice";
import FormatNumber from "@/components/FormatNumber";
import { Token } from "@/lib/components/types";
import { useParaSwap } from "@/hooks/swap/useParaswapSwap";
import { base } from "viem/chains";
import { useAccount } from "wagmi";
import { useAssetScooperContractWrite } from "@/hooks/useAssetScooperWriteContract";
import { PARASWAP_TRANSFER_PROXY } from "@/constants/contractAddress";
import { Address, erc20Abi, parseUnits } from "viem";
import { useSmartWallet } from "@/hooks/useSmartWallet";
import { useWalletsPortfolio } from "@/hooks/useMobula";
import { useEthPrice } from "@/hooks/useGetETHPrice2";
import { ETH_ADDRESS } from "@/utils";
import CustomTooltip from "@/components/CustomTooltip";
import { TokenListProvider } from "@/provider/tokenListProvider";

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
  const { address } = useAccount();
  const { tokenList: selectedTokens } = useContext(TokenListProvider);

  const router = useRouter();

  const { getRate, buildSwap, swapsTrxData } = useParaSwap();
  const { refetch: refetchTokenBalance } = useWalletsPortfolio();

  const { ethPrice } = useEthPrice({
    address: ETH_ADDRESS,
  });

  const handleSwap = async () => {
    const trade = await getRate({
      srcToken: selectedTokens[0],
      destToken: selectedTokens[1],
      srcAmount: "10000",
      networkID: base.id,
    });

    const swapBuild = await buildSwap({
      srcToken: selectedTokens[0],
      destToken: selectedTokens[1],
      srcAmount: "10000",
      minAmount: "10000",
      priceRoute: trade,
      userAddress: address ?? "",
      receiver: address ?? "",
      networkID: base.id,
    });
  };

  const handleBatchSwap = async () => {
    const swapTransactions = await swapsTrxData();
    if (swapTransactions) {
      console.log("this is batch swap data", swapTransactions);
    }
  };

  const {
    write: approveToken,
    isPending: isApprovalPending,
    isConfirmed: isConfirmed,
    isConfirming,
  } = useAssetScooperContractWrite({
    fn: "approve",
    args: [PARASWAP_TRANSFER_PROXY as Address, parseUnits("100000000000", 18)],
    abi: erc20Abi,
    contractAddress:
      selectedTokens.length > 0
        ? (selectedTokens[0].address as Address)
        : "0xE3c347cEa95B7BfdB921074bdb39b8571F905f6D",
  });

  const { isSmartWallet } = useSmartWallet();

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
              <Text
                fontWeight={500}
                fontSize={{ base: "13px", md: "14px" }}
                color="#281629"
              >
                Sweep
              </Text>
            </Flex>
            <Text fontSize="12px" color={COLORS.tabTextColor}>
              Update in 30 sec 1ETH ≈ {ethPrice} USDC
              {/* 1ETH ≈ {price} USDC{" "} */}
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
              <Text
                fontSize="14px"
                fontWeight={500}
                color={COLORS.tabTextColor}
              >
                You will receive..
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
                Transaction fee
              </Text>
              <CustomTooltip label="Estimated Transaction fee to process this transaction.">
                <AiOutlineQuestionCircle color="#C9BCCA" />
              </CustomTooltip>
            </Flex>

            <Text>__</Text>
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
              <CustomTooltip label="Estimated Time taken for this transaction to be completed.">
                <AiOutlineQuestionCircle color="#C9BCCA" />
              </CustomTooltip>
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
