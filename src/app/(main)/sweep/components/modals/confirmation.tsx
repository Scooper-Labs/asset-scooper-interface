import React, { ReactNode } from "react";
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
  Box,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { ChainId } from "@/constants";
import { use1inchSwap } from "@/hooks/swap/use1inchSwap";
import { useSelectedTokens } from "@/hooks/useSelectTokens";
import { GoInfo } from "react-icons/go";
import ApprovalModal from "./approval";
function ConfirmationModal({
  tokensAllowanceStatus,
}: {
  tokensAllowanceStatus: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected, chainId, address } = useAccount();

  const { selectedTokens } = useSelectedTokens();

  const {
    fetchSwapData,
    isLoading,
    tokensWithLiquidity,
    tokensWithNoLiquidity,
    swapCallDataArray,
  } = use1inchSwap(chainId as ChainId, address);

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
                <Text>Get</Text>
                <Text fontSize="xx-large">{"xxx"} ETH</Text>
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
                  <Text>Fee</Text>
                  <Flex>
                    0.5% ~ $500 <GoInfo size={15} />
                  </Flex>
                </HStack>
                <HStack width="100%" justifyContent="space-between">
                  <Text>Estimated Transaction Time:</Text>
                  <Flex>
                    <Text>12-15 mins</Text> <GoInfo size={15} />
                  </Flex>
                </HStack>
              </VStack>

              <HStack width="100%">
                <ApprovalModal tokensAllowanceStatus={tokensAllowanceStatus} />
                <Button
                  width="100%"
                  color="#fff"
                  bg={tokensAllowanceStatus ? "#0099FB" : "#B5B4C6"}
                >
                  Sweep
                </Button>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
