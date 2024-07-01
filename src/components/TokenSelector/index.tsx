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
import TokenSelectorModalComponent from "./CustomModalComponent";
import { TokenSelectFooter } from "./TokenSelectorFooter";
import { useWalletsPortfolio } from "@/hooks/useMobula";
import { setUserWalletTokenWithBalance } from "@/store/sweep/sweepSlice";
import { useSweepThreshhold } from "@/hooks/settings/useThreshold";
import useGetETHPrice from "@/hooks/useGetETHPrice";
import { WalletPortfolioClass } from "@/utils/classes";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { RootState } from "@/store/store";

export function TokenSelector({ children }: { children?: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useWalletsPortfolio();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUserWalletTokenWithBalance(data.assets));
    }
  }, [data]);

  const { sweepthreshHold } = useSweepThreshhold();
  const { price } = useGetETHPrice();

  const selectedTokens = meetsThreshold(data, price, sweepthreshHold);

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

      <TokenSelectorModalComponent
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        modalContentStyle={{
          background: "rgba(255, 255, 255, 0)",
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${COLORS.borderColor}`,
          boxShadow: "#E9C7EA4D",
        }}
      >
        <ModalCloseButton
          color="#151515"
          _hover={{
            bgColor: "none",
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
              <Text>Convert Low Balance </Text>
              <Text fontSize="small" fontWeight="100" color="#9E829F">
                {selectedTokens ? selectedTokens.length : 0} Token(s) with
                balance below {sweepthreshHold}
                ETH
              </Text>
              {/* <Box
                border="none"
                padding="8px"
                backgroundColor="#E5F2FA"
                fontSize="small"
                color="#018FE9"
                width="fit-content"
                borderRadius="8px"
                cursor="pointer"
              >
                Change ThreshHold
              </Box> */}
            </VStack>

            <TokenSelectList userWalletTokens={selectedTokens} />
          </VStack>

          <TokenSelectFooter
            onClose={onClose}
            userWalletTokens={selectedTokens}
          />
        </VStack>
      </TokenSelectorModalComponent>
    </>
  );
}
function meetsThreshold(
  data: WalletPortfolioClass | null,
  price: number,
  sweepthreshHold: string
) {
  const noETH = data?.assets.filter(
    (token) => token.symbol !== "ETH" && token.symbol !== "WETH"
  );
  return noETH?.filter(
    (token) => token.quoteUSD / price < parseFloat(sweepthreshHold)
  );
}
