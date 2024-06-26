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
        // onChange={
        //   isSelected(token)
        //     ? () => _unSelectToken(token)
        //     : () => _selectToken(token)
        // }
        iconColor={"#7F56D9"}
      >
        <HStack alignItems="center">
          {/* <Box overflow="hidden" rounded="100%">
            <Image src={logoURI} width={25} height={25} alt={name} />
          </Box> */}
          <WrapItem>
            <Avatar size="xs" name={name} src={logoURI} />
          </WrapItem>
          <VStack gap="0" alignItems="start">
            <Text fontWeight="700">
              {symbol.length > 6 ? `${symbol.substring(0, 5)}...` : symbol}
            </Text>
            <Text color="#A8BBD6" fontSize="smaller">
              {name}
            </Text>
          </VStack>
        </HStack>
      </Checkbox>

      {/* bALANCE AND price panels*/}

      <VStack alignItems="end" gap="0">
        <Text fontWeight="700">
          {userBalance.toFixed(3)}{" "}
          {symbol.length > 4 ? `${symbol.substring(0, 3)}...` : symbol}
        </Text>
        <Text color="#A8BBD6" fontSize="smaller">
          ~$ {quoteUSD.toFixed(4)}
        </Text>
      </VStack>
    </HStack>
  );
}

export default TokenSelectListRow;
