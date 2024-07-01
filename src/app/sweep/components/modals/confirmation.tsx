"use client";

import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  VStack,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useSelectedTokens } from "@/hooks/useSelectTokens";
import ApprovalModal from "./approval";
import assetscooperAbi from "@/constants/abi/assetscooper.json";
import { assetscooper_contract } from "@/constants/contractAddress";
import { useAssetScooperContractWrite } from "@/hooks/useAssetScooperWriteContract";
import { Address } from "viem";
import { ETHToReceive } from "../sweep-widget";
import { useSlippageTolerance } from "@/hooks/settings/slippage/useSlippage";
import { SlippageToleranceStorageKey } from "@/hooks/settings/slippage/utils";
import TransactionComplete from "./TransactionCompleted";
import ErrorOccured from "./ErrorOccured";

function ConfirmationModal({
  tokensAllowanceStatus,
  refetch,
}: {
  tokensAllowanceStatus: boolean;
  refetch: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    onClose: onCloseConfirmed,
    isOpen: isOpenConfirmed,
    onOpen: onOpenConfirmed,
  } = useDisclosure();
  const {
    onClose: onCloseError,
    isOpen: isOpenError,
    onOpen: onOpenError,
  } = useDisclosure();

  const { slippageTolerance } = useSlippageTolerance(
    SlippageToleranceStorageKey.Sweep
  );

  const { selectedTokens } = useSelectedTokens();

  const {
    write: sweepTokens,
    isPending: isSweeping,
    isConfirming,
    isConfirmed,
    hash,
    isWriteContractError,
    WriteContractError,
    isWaitTrxError,
    WaitForTransactionReceiptError,
  } = useAssetScooperContractWrite({
    fn: "sweepTokens",
    args: [selectedTokens.map((token) => token.address), [0n]],
    abi: assetscooperAbi,
    contractAddress: assetscooper_contract as Address,
  });

  const handlesweep = async () => {
    await sweepTokens();
  };

  useEffect(() => {
    if (isConfirmed || isWriteContractError || isWaitTrxError) {
      onClose();
    }
    if (isConfirmed) {
      onOpenConfirmed();
    }
    if (isWriteContractError || isWaitTrxError) {
      onOpenError();
    }
  }, [isConfirmed, isWriteContractError, isWaitTrxError]);

  const isLoading = isSweeping || isConfirming;
  const isDisabled = !tokensAllowanceStatus || isLoading;

  console.log(
    isDisabled,
    !tokensAllowanceStatus || isLoading,
    tokensAllowanceStatus,
    isLoading
  );

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Review Transactions</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="start" gap="1.3rem">
              <VStack gap="0">
                <Text textAlign="start" width="100%">
                  Sweep
                </Text>
                <Text fontWeight="700">
                  {selectedTokens.length} selected Tokens
                </Text>
              </VStack>

              <VStack alignItems="start" gap="0">
                <Text>Get</Text>{" "}
                <Text fontSize="30px">
                  {" "}
                  <ETHToReceive selectedTokens={selectedTokens} />
                </Text>
              </VStack>

              <VStack
                bg="#F6F9F9"
                width="100%"
                padding="1rem"
                borderRadius="18px"
                fontSize="small"
              >
                <Text fontWeight="700" width="100%" textAlign="start">
                  Order Details
                </Text>

                <HStack width="100%" justifyContent="space-between">
                  <Text>Slippage</Text>
                  <Text color="#674669">{slippageTolerance}%</Text>
                </HStack>
                <HStack width="100%" justifyContent="space-between">
                  <Text>Estimated Transaction Time::</Text>
                  <Flex>
                    <Text color="#674669">
                      {3 * selectedTokens.length} seconds
                    </Text>
                  </Flex>
                </HStack>
              </VStack>

              <HStack width="100%">
                <ApprovalModal
                  tokensAllowanceStatus={tokensAllowanceStatus}
                  refetch={refetch}
                />
                <button
                  onClick={handlesweep}
                  disabled={isDisabled}
                  style={{
                    width: "100%",
                    color: "#fff",
                    background: tokensAllowanceStatus ? "#0099FB" : "#B5B4C6",
                    height: "2.5rem",
                    borderRadius: "0.375rem",
                  }}
                >
                  {isLoading ? "Sweeping" : "Sweep"}
                </button>
                {/* 
                <Button
                  width="100%"
                  color="#fff"
                  onClick={handlesweep}
                  disabled={isDisabled}
                  bg={tokensAllowanceStatus ? "#0099FB" : "#B5B4C6"}
                >
                  {isLoading ? "Sweeping" : "Sweep"}
                </Button> */}
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <TransactionComplete
        isOpen={isConfirmed}
        onClose={onCloseConfirmed}
        hash={hash as `0x${string}`}
        Component={<ETHToReceive selectedTokens={selectedTokens} />}
      />
      <ErrorOccured
        isOpen={isOpenError && (isWriteContractError || isWaitTrxError)}
        onClose={onCloseError}
        error={
          isWriteContractError
            ? WriteContractError
            : WaitForTransactionReceiptError
        }
      />
    </>
  );
}

export default ConfirmationModal;
