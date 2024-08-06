"use client"
import {
  Checkbox,
  HStack,
  Text,
  VStack,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import FormatNumber from "../FormatNumber";
import { TokenListProvider } from "@/provider/tokenListProvider";
import { MoralisAssetClass } from "@/utils/classes";

function TokenSelectListRow({ token }: { token: MoralisAssetClass }) {
  const { logoURI, name, symbol, quoteUSD, userBalance } = token;

  const { isTokenSelected, addTokenList, removeTokenList } =
    useContext(TokenListProvider);

  return (
    <HStack
      justifyContent="space-between"
      width="100%"
      whiteSpace="nowrap"
      bg={isTokenSelected(token) ? "gray.100" : ""}
      borderRadius="12px"
      padding="8px"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      transition="color"
      transitionDuration="500ms"
      onClick={
        isTokenSelected(token)
          ? (e) => {
              e.preventDefault();
              removeTokenList(token);
            }
          : (e) => {
              e.preventDefault();
              addTokenList(token);
            }
      }
    >
      <Checkbox
        isChecked={isTokenSelected(token)}
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
