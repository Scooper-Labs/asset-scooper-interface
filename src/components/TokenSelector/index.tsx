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
  VStack,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TokenSelectList from "./token-select-list";
import ModalComponent from "../ModalComponent";
import TokenSelectorModalComponent from "./CustomModalComponent";
import { TokenSelectFooter } from "./TokenSelectorFooter";

export function TokenSelector({ children }: { children?: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        onClick={onOpen}
        fontWeight="500"
        // bg={COLORS.btnBGGradient}
        bg="#FAF6FD"
        borderRadius={10}
        color={COLORS.tabTextColor}
        padding="12px"
        // style={{
        //   border: "1px solid #E7BFE7",
        //   borderImage: `${COLORS.borderImageColor}`,
        //   borderRadius: "8px",
        // }}
        // _hover={{
        //   bg: `${COLORS.btnBGGradient}`,
        //   border: "1px solid",
        //   borderImage: `${COLORS.borderImageColor}`,
        // }}
        cursor="pointer"
        width="100%"
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
        <ModalCloseButton />
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
            </VStack>

            <TokenSelectList />
          </VStack>

          <TokenSelectFooter />
        </VStack>
      </TokenSelectorModalComponent>
    </>
  );
}
