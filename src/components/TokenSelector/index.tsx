"use client";
import {
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import { ReactNode, useEffect } from "react";
import TokenSelectList from "./token-select-list";
import { TokenSelectFooter } from "./TokenSelectorFooter";
import { useSweepThreshhold } from "@/hooks/settings/useThreshold";
import { useEthPrice } from "@/hooks/useGetETHPrice2";
import { MoralisAssetClass } from "@/utils/classes";
import { useBalances } from "@/hooks/balances/useBalances";
import { useAccount } from "wagmi";
import ModalComponent from "../ModalComponent/TabViewModal";
import { ETH_ADDRESS } from "@/utils";

export function TokenSelector({ children }: { children?: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address, isConnected } = useAccount();
  const { isError, isLoading, moralisAssets, refetch } = useBalances({
    address,
  });

  useEffect(() => {
    refetch();
  }, [address, isConnected]);

  const { sweepthreshHold } = useSweepThreshhold();
  const { ethPrice } = useEthPrice({
    address: ETH_ADDRESS,
  });

  const selectedTokens = meetsThreshold(
    moralisAssets,
    ethPrice,
    sweepthreshHold
  );

  return (
    <>
      <Box
        onClick={onOpen}
        fontWeight="500"
        mt="4px"
        bg="#FAF6FD"
        borderRadius={8}
        color={COLORS.tabTextColor}
        padding="8px"
        cursor="pointer"
        width="100%"
        border="1px solid #F6EEFC"
      >
        {children}
      </Box>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        modalContentStyle={{
          background: "rgba(255, 255, 255, 0)",
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${COLORS.borderColor}`,
          boxShadow: "#E9C7EA4D",
          padding: "0",
        }}
        scrollBehavior={undefined}
        modalBodyStyle={{
          padding: "0",
        }}
      >
        <ModalCloseButton
          mt="10px"
          color="#151515"
          _hover={{
            bg: "none",
          }}
        />
        <VStack
          justifyContent="space-between"
          width="100%"
          height="100%"
          gap="1rem"
        >
          <VStack
            width="100%"
            borderRadius={10}
            height="100%"
            background="white"
          >
            <VStack
              gap="3px"
              width="full"
              alignItems="start"
              px="1.2rem"
              pt="1rem"
              pb="0.7rem"
            >
              <Text color="#2C333B" fontWeight={500}>
                Convert Low Balance
              </Text>
              {address ? (
                <>
                  <Text fontSize="small" fontWeight="100" color="#9E829F">
                    {selectedTokens ? selectedTokens.length : 0} Token(s) with
                    balance below {sweepthreshHold} ETH
                  </Text>
                </>
              ) : (
                <Text fontSize="small" color="#9E829F">
                  No Tokens detected
                </Text>
              )}
            </VStack>

            <TokenSelectList
              userWalletTokens={selectedTokens}
              error={isError}
              loading={isLoading}
            />
          </VStack>

          <TokenSelectFooter
            onClose={onClose}
            userWalletTokens={selectedTokens}
          />
        </VStack>
      </ModalComponent>
    </>
  );
}

export default TokenSelector;

function meetsThreshold(
  data: MoralisAssetClass[] | null,
  price: number,
  sweepthreshHold: string
) {
  const noETH = data?.filter(
    (token) => token.symbol !== "ETH" && token.symbol !== "WETH"
  );

  return noETH?.filter(
    (token) => token.quoteUSD / price < parseFloat(sweepthreshHold)
  );
}
