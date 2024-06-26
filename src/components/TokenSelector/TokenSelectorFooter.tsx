import {
  Button,
  Flex,
  Text,
  HStack,
  VStack,
  Checkbox,
  CheckboxGroup,
  Box,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import { FaArrowRight } from "react-icons/fa";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelectedTokens } from "@/hooks/useSelectTokens";
import { Token } from "@/lib/components/types";

export function TokenSelectFooter({ onClose }: { onClose: () => void }) {
  const {
    _selectAllToken,
    userWalletTokens,
    selectedTokens,
    _clearSelectedTokens,
  } = useSelectedTokens();

  const isAllSelected = Boolean(
    userWalletTokens.length == selectedTokens.length,
  );

  const calculateTotalUSDValue = (tokens: Token[]) => {
    return tokens.reduce((total, token) => {
      const tokenUSDValue = token.quoteUSD;
      return total + tokenUSDValue;
    }, 0);
  };
  const totalUSDValue = useMemo(
    () => calculateTotalUSDValue(selectedTokens),
    [selectedTokens],
  );
  return (
    <Flex
      borderRadius={10}
      width="full"
      background="white"
      py="1rem"
      overflow="hidden"
      justify="space-between"
      padding="1rem"
    >
      <Text color="#0099FB" fontSize="larger">
        ~ ${totalUSDValue.toFixed(3)}
      </Text>

      <HStack>
        <Button
          alignContent="center"
          border={`1px solid ${
            selectedTokens.length > 0 ? "#0099FB" : "#D0D5DD"
          }`}
          borderRadius={10}
          color={selectedTokens.length > 0 ? "#0099FB" : "#A8BBD6"}
          fontWeight="400"
          onClick={
            isAllSelected
              ? (e) => {
                  e.preventDefault();
                  _clearSelectedTokens();
                }
              : (e) => {
                  e.preventDefault();
                  _selectAllToken(userWalletTokens);
                }
          }
        >
          <Checkbox isChecked={isAllSelected}>
            <Text marginLeft="5px">Select All</Text>
          </Checkbox>
        </Button>
        <Button
          background={selectedTokens.length > 0 ? "#0099FB" : "#B5B4C6"}
          borderRadius={10}
          onClick={onClose}
        >
          <FaArrowRight size={15} color="#fff" />
        </Button>
      </HStack>
    </Flex>
  );
}
