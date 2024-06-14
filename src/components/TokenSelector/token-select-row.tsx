import { Token } from "@/lib/components/types";
import { Box, Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

function TokenSelectListRow({ token }: { token: Token }) {
  const { address, logoURI, name, symbol, decimals } = token;
  return (
    <HStack>
      <Checkbox colorScheme="red" >
        <HStack>
          <Box overflow="hidden" rounded="100%">
            <Image src={logoURI} width={20} height={20} alt={name} />
          </Box>
          <VStack>
            <Text fontWeight="700">{symbol}</Text>
            <Text color="#A8BBD6" fontSize="smaller">
              {name}
            </Text>
          </VStack>
        </HStack>
      </Checkbox>
    </HStack>
  );
}

export default TokenSelectListRow;
