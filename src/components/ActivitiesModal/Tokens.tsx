import React from "react";
import { Text, HStack, Avatar, Flex, Heading, Stack } from "@chakra-ui/react";

import { Token } from "@/lib/components/types";
import FormatNumber from "@/components/FormatNumber";

const Tokens = ({ userWalletTOKENS }: { userWalletTOKENS: Token[] }) => {
  return (
    <Stack>
      {userWalletTOKENS.map((token) => (
        <Flex justify="space-between" py="10px" key={token.address}>
          <HStack>
            <Avatar boxSize="32px" name={token.name} src={token.logoURI} />
            <Flex flexDir="column">
              <Heading fontSize="16px" fontWeight={500}>
                {token.symbol}
              </Heading>
              <Text fontSize="13px" color="#A8BBD6">
                {token.name}
              </Text>
            </Flex>
          </HStack>

          <Flex flexDir="column" textAlign="right">
            <Heading fontSize="16px" fontWeight={500}>
              <FormatNumber amount={token.userBalance} />
            </Heading>
            <Text fontSize="14px" color="#9E829F" fontWeight={400}>
              ~ <FormatNumber amount={token.quoteUSD} pre="$" />
            </Text>
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
};

export default Tokens;
