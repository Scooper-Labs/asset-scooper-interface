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

import assetscooperAbi from "@/constants/abi/assetscooper.json";
import { assetscooper_contract } from "@/constants/contractAddress";
import { useAssetScooperContractWrite } from "@/hooks/useAssetScooperWriteContract";
import { Address, parseUnits } from "viem";

function ConfirmationModal({
  tokensAllowanceStatus,
  refetch,
}: {
  tokensAllowanceStatus: boolean;
  refetch: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected, chainId, address } = useAccount();

  const { selectedTokens } = useSelectedTokens();

  const { fetchSwapData, isLoading, swapCallDataArray } = use1inchSwap(
    chainId as ChainId,
    address,
  );

  const {
    write: swap,
    isPending: isApprovalPending,
    isConfirmed: isConfirmed,
    isWriteContractError: isApprovalError,
  } = useAssetScooperContractWrite({
    fn: "swap",
    args: [parseUnits("0", 18), swapCallDataArray],
    abi: assetscooperAbi,
    contractAddress: assetscooper_contract as Address,
  });
  const handlesweep = async () => {
    swap();
  };

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
                <ApprovalModal
                  tokensAllowanceStatus={tokensAllowanceStatus}
                  refetch={refetch}
                />
                <Button
                  width="100%"
                  color="#fff"
                  onClick={fetchSwapData}
                  bg={tokensAllowanceStatus ? "#0099FB" : "#B5B4C6"}
                >
                  fetch calldata
                </Button>
                <Button
                  width="100%"
                  color="#fff"
                  onClick={handlesweep}
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