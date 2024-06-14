import { Token } from "@/lib/components/types";
import { Box, Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export interface TokenInfo extends Token {
  price: number;
  amount: string;
}

function TokenSelectListRow({ token }: { token: Token }) {
  const { address, logoURI, name, symbol, decimals } = token;
  return (
    <HStack justifyContent="space-between" width="100%" whiteSpace="nowrap">
      <Checkbox colorScheme="#fff" iconColor="#7F56D9">
        <HStack alignItems="center">
          <Box overflow="hidden" rounded="100%">
            <Image src={logoURI} width={25} height={25} alt={name} />
          </Box>
          <VStack gap="0" alignItems="start">
            <Text fontWeight="700">{symbol}</Text>
            <Text color="#A8BBD6" fontSize="smaller">
              {name}
            </Text>
          </VStack>
        </HStack>
      </Checkbox>

      {/* bALANCE AND price panels*/}

      <VStack alignItems="end" gap="0">
        <Text fontWeight="700">0.002 {symbol}</Text>
        <Text color="#A8BBD6" fontSize="smaller">
          ~$12.5
        </Text>
      </VStack>
    </HStack>
  );
}

export default TokenSelectListRow;
