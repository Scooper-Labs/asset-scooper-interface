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
  Stack,
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
import { COLORS } from "@/constants/theme";
import ModalComponent from "../ModalComponent";
import { IoMdClose } from "react-icons/io";

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

      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        modalContentStyle={{
          background: "#FDFDFD",
          borderRadius: "16px",
          border: `1px solid ${COLORS.borderColor}`,
        }}
      >
        <Box>
          {/* --------------------- Header ---------------------- */}
          <Flex justify="space-between" mb="20px">
            <Flex flexDir="column">
              <Text fontWeight={500} fontSize="16px">
                Convert Low Balance{" "}
              </Text>
              <Text fontSize="13px" fontWeight={500} color="#9E829F">
                48 Tokens with balance below 0.004 ETH
              </Text>
              <Box
                border="none"
                py="6px"
                px="6px"
                backgroundColor="#E5F2FA"
                fontSize="13px"
                mt="8px"
                color="#018FE9"
                width="fit-content"
                borderRadius="4px"
                fontWeight={400}
                cursor="pointer"
              >
                Change ThreshHold
              </Box>
            </Flex>

            <Box cursor="pointer" onClick={onClose}>
              <IoMdClose size="24px" />
            </Box>
          </Flex>

          <Flex flexDir="column" borderTop="1px solid #F7E5F7">
            <TokenSelectList />
          </Flex>
        </Box>
      </ModalComponent>
    </>
  );
}
