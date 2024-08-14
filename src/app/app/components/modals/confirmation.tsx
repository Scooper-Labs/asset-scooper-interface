"use client";

import React, { useContext } from "react";
import {
  Stack,
  Box,
  Button,
  useDisclosure,
  chakra,
  VStack,
  Flex,
  Text,
  HStack,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import ApprovalModal from "./approval";
import { PARASWAP_TRANSFER_PROXY } from "@/constants/contractAddress";
import {
  useSweepTokens,
  useSweepTokensSimulation,
} from "@/hooks/useAssetScooperWriteContract";
import { Address } from "viem";
import { ETHToReceive } from "../sweep-widget";
import { useSlippageTolerance } from "@/hooks/settings/slippage/useSlippage";
import { SlippageToleranceStorageKey } from "@/hooks/settings/slippage/utils";
import { useBatchApprovals } from "@/hooks/approvals/useBatchApprovals";
import { useSmartWallet } from "@/hooks/useSmartWallet";
import { useParaSwap } from "@/hooks/swap/useParaswapSwap";
import { IoMdClose } from "react-icons/io";
import ModalComponent from "@/components/ModalComponent/TabViewModal";
import { COLORS } from "@/constants/theme";
import OverlappingImage, { getImageArray } from "../sweep-widget/ImageLap";
import { TokenListProvider } from "@/provider/tokenListProvider";

function ConfirmationModal({
  tokensAllowanceStatus,
  refetch,
}: {
  tokensAllowanceStatus: boolean;
  refetch: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { slippageTolerance } = useSlippageTolerance(
    SlippageToleranceStorageKey.Sweep
  );

  const { tokenList: selectedTokens, clearList } =
    useContext(TokenListProvider);
  const { isSmartWallet } = useSmartWallet();

  //Batch approvals
  const { approveTTokens } = useBatchApprovals({
    tokens: selectedTokens,
    amounts: selectedTokens.map((item) => item.userBalance.toString()),
    spender: PARASWAP_TRANSFER_PROXY as Address,
  });

  //min-out put for eoa swap, array of bigint 0s
  const minAmountOut = selectedTokens.map((t) => 0n);

  //eoa swap
  const args = [selectedTokens.map((token) => token.address), minAmountOut];
  const { data, resimulate, isPending } = useSweepTokensSimulation(args);
  const { isLoading, isSuccess, sweepTokens } = useSweepTokens(data);
  console.log(isPending);
  const handlesweep = async () => {
    const _result = await resimulate();
    await sweepTokens(_result);
    if (isSuccess) {
      clearList();
    }
  };

  const { executeBatchSwap } = useParaSwap();

  const isSweeping = isPending || isLoading;
  const isDisabled = !tokensAllowanceStatus || isSweeping;
  return (
    <>
      <Button
        width="100%"
        bg="#0099FB"
        color="#fff"
        onClick={() => {
          onOpen();
        }}
      >
        Sweep
      </Button>

      <ModalComponent
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        modalContentStyle={{
          py: "0",
        }}
      >
        {/* ------------------------ Header section ---------------------- */}
        <Flex justify="space-between" alignItems="center">
          <Box flex="1" textAlign="center">
            <Text fontWeight={700} fontSize="14px" color="#0D0D0D">
              Review Transaction
            </Text>
          </Box>

          <IconButton
            aria-label="close-btn"
            icon={<IoMdClose size="24px" color="#0D0D0D" />}
            onClick={onClose}
            bg="none"
            _hover={{
              bg: "none",
            }}
          />
        </Flex>

        <Stack w="100%">
          {/* ----------------- Token Selected section ---------------- */}
          <Flex flexDir="column">
            <Text
              fontWeight={500}
              fontSize="14px"
              textAlign="start"
              color="#676C87"
              width="100%"
            >
              Sweep
            </Text>

            <HStack mt="8px">
              <OverlappingImage imageArray={getImageArray(selectedTokens)} />
              <Text fontWeight="500" fontSize="14px" color="#2C333B">
                {selectedTokens.length} selected Tokens
              </Text>
            </HStack>
          </Flex>

          {/* ----------------- ETHTOReceive section ---------------- */}
          <VStack alignItems="start" gap="0">
            <Text
              fontWeight={500}
              fontSize="14px"
              textAlign="start"
              color="#676C87"
              width="100%"
            >
              Get
            </Text>
            <Text fontSize="30px">
              {" "}
              <ETHToReceive selectedTokens={selectedTokens} />
            </Text>
          </VStack>

          {/* ----------------- Transaction Details section ---------------- */}
          <VStack
            bg="#F6F9F9"
            width="100%"
            padding="1rem"
            borderRadius="18px"
            fontSize="small"
            mt="10px"
          >
            <Text
              fontWeight="700"
              fontSize="14px"
              color="#281629"
              width="100%"
              textAlign="start"
            >
              Order Details:
            </Text>

            <HStack width="100%" justifyContent="space-between">
              <Text color="#151829" fontSize="14px" fontWeight={500}>
                Slippage
              </Text>
              <Text color="#674669" fontSize="14px" fontWeight={500}>
                {slippageTolerance}%
              </Text>
            </HStack>

            <HStack width="100%" justifyContent="space-between" mt="6px">
              <Text color="#151829" fontSize="14px" fontWeight={500}>
                Estimated Transaction Time:
              </Text>

              <Flex>
                <Text color="#674669" fontSize="14px" fontWeight={500}>
                  {3 * selectedTokens.length} seconds
                </Text>
              </Flex>
            </HStack>
          </VStack>

          <Text
            mt="10px"
            fontSize="14px"
            color="#676C87"
            fontWeight="500"
            textAlign="center"
          >
            Your transaction is on way to be been processed and{" "}
            <chakra.span color="#151515" fontWeight={600} fontSize="14px">
              {" "}
              <ETHToReceive selectedTokens={selectedTokens} />
            </chakra.span>{" "}
            will be deposited to your Wallet.
          </Text>

          {/* ----------------- Button section ---------------- */}
          <HStack width="100%" mt="10px" mb="20px">
            {isSmartWallet ? (
              <Button
                borderRadius="8px"
                width="100%"
                color="#FDFDFD"
                fontSize="16px"
                fontWeight={500}
                _hover={{
                  bg: tokensAllowanceStatus
                    ? `${COLORS.inputBgcolor}`
                    : `${COLORS.btnGradient}`,
                }}
                bg={
                  tokensAllowanceStatus
                    ? `${COLORS.inputBgcolor}`
                    : `${COLORS.btnGradient}`
                }
                onClick={() => approveTTokens()}
                disabled
                border="1px solid #F6EEFC"
              >
                Approve All
              </Button>
            ) : (
              <ApprovalModal
                tokensAllowanceStatus={tokensAllowanceStatus}
                refetch={refetch}
              />
            )}
            {isSmartWallet ? (
              <Button
                onClick={() => executeBatchSwap()}
                disabled={isDisabled}
                width="100%"
                color="#FDFDFD"
                fontSize="16px"
                fontWeight={500}
                _hover={{
                  bg: tokensAllowanceStatus
                    ? `${COLORS.btnGradient}`
                    : `${COLORS.inputBgcolor}`,
                }}
                bg={
                  tokensAllowanceStatus
                    ? `${COLORS.btnGradient}`
                    : `${COLORS.inputBgcolor}`
                }
                height="2.5rem"
                borderRadius="8px"
              >
                Sweep
              </Button>
            ) : (
              <Button
                onClick={handlesweep}
                disabled={isDisabled}
                width="100%"
                color="#FDFDFD"
                fontSize="16px"
                fontWeight={400}
                _hover={{
                  bg: tokensAllowanceStatus
                    ? `${COLORS.btnGradient}`
                    : `${COLORS.inputBgcolor}`,
                }}
                bg={
                  tokensAllowanceStatus
                    ? `${COLORS.btnGradient}`
                    : `${COLORS.inputBgcolor}`
                }
                height="2.5rem"
                borderRadius="8px"
              >
                {isSweeping ? (
                  <HStack spacing={2}>
                    <Spinner size="sm" color="white" />
                    <Text>Sweeping</Text>
                  </HStack>
                ) : (
                  "Sweep"
                )}
              </Button>
            )}
          </HStack>
        </Stack>
      </ModalComponent>
    </>
  );
}

export default ConfirmationModal;
