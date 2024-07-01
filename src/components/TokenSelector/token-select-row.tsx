import { useSelectedTokens } from "@/hooks/useSelectTokens";
import { Token } from "@/lib/components/types";
import {
  Box,
  Checkbox,
  HStack,
  Text,
  VStack,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import FormatNumber from "../FormatNumber";

function TokenSelectListRow({ token }: { token: Token }) {
  const { address, logoURI, name, symbol, decimals, quoteUSD, userBalance } =
    token;

  const { isSelected, _selectToken, _unSelectToken } = useSelectedTokens();

  return (
    <HStack
      justifyContent="space-between"
      width="100%"
      whiteSpace="nowrap"
      bg={isSelected(token) ? "gray.100" : ""}
      borderRadius="12px"
      padding="8px"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      transition="color"
      transitionDuration="500ms"
      onClick={
        isSelected(token)
          ? (e) => {
              e.preventDefault();
              _unSelectToken(token);
            }
          : (e) => {
              e.preventDefault();
              _selectToken(token);
            }
      }
    >
      <Checkbox
        isChecked={isSelected(token)}
        colorScheme="#fff"
        iconColor={"#7F56D9"}
      >
        <HStack alignItems="center">
          <WrapItem>
            <Avatar size="sm" name={name} src={logoURI} />
          </WrapItem>
          <VStack gap="0" alignItems="start">
            <Text fontWeight="500" color="#281629">
              {symbol.length > 6 ? `${symbol.substring(0, 5)}...` : symbol}
            </Text>
            <Text color="#A8BBD6" fontSize="13px" fontWeight={500}>
              {name}
            </Text>
          </VStack>
        </HStack>
      </Checkbox>

      {/* bALANCE AND price panels*/}

      <VStack alignItems="end" gap="0">
        <Text fontWeight="700">
          <FormatNumber
            suf={symbol.length > 4 ? `${symbol.substring(0, 3)}...` : symbol}
            amount={userBalance}
          />
        </Text>
        <Text color="#A8BBD6" fontSize="smaller">
          ~ <FormatNumber pre="$" amount={quoteUSD} />
        </Text>
      </VStack>
    </HStack>
  );
}

export default TokenSelectListRow;
