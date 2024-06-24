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
  Text,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { ChainId } from "@/constants";
import { use1inchSwap } from "@/hooks/swap/use1inchSwap";

function SwapModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected, chainId, address } = useAccount();

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
        onClick={() => {
          fetchSwapData();
          onOpen();
        }}
      >
        Swap {isLoading && "Swapp is Loading"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {tokensWithLiquidity.length > 0 && (
              <>
                <VStack>
                  <Text>
                    You are about to swap the following tokens to wrapped
                    ethereum Gas:: ___ Total Quote:: ___
                    {tokensWithLiquidity.map((token) => {
                      return <Box key={token.address}>{token.name}</Box>;
                    })}
                  </Text>
                  <Text>
                    {swapCallDataArray.map((data) => (
                      <span key={data}>{data}</span>
                    ))}
                  </Text>
                </VStack>
              </>
            )}
            {tokensWithNoLiquidity.length > 0 && (
              <Box>
                <Text>
                  The following tokens failed to swap for some reasons:
                  insufficient liquidity... Increase slippage
                </Text>
                {tokensWithNoLiquidity.map((token) => {
                  return <Box key={token.address}>{token.name}</Box>;
                })}
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SwapModal;
