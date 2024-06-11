import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TokenSelectList from "./token-select-list";

export function TokenSelector({ children }: { children?: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        backgroundColor="#F6EEFC"
        padding="8px"
        onClick={onOpen}
        width="100%"
        cursor="pointer"
      >
        {children}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader backgroundColor="transparent" background="transparent">
            <Text>Convert Low Balance </Text>
            <Text fontSize="small" fontWeight="100" color="#9E829F">
              48 Tokens with balance below 0.004 ETH
            </Text>
            <Box
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
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody borderTop="1px solid #F7E5F7">
            <TokenSelectList />
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
