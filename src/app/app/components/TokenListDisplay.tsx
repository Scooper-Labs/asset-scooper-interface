import React from "react";
import { VStack, HStack, Text, Avatar } from "@chakra-ui/react";
import { Token } from "@/lib/components/types";

interface TokenListDisplayProps {
  tokens: Token[];
  title: string;
  insufficientLiquidity?: boolean;
}

export const TokenListDisplay: React.FC<TokenListDisplayProps> = ({
  tokens,
  title,
  insufficientLiquidity,
}) => (
  <VStack>
    <Text textAlign="center" fontSize="12px" color="#676C87">
      {title}
    </Text>
    <HStack spacing={-2} alignItems="center">
      {tokens.slice(0, 5).map((token) => (
        <Avatar
          key={token.address}
          size="sm"
          name={token.name}
          src={token.logoURI}
          border="2px solid white"
        />
      ))}
      {tokens.length > 5 && (
        <Text color="#A8BBD6" fontSize="13px" fontWeight={500}>
          +{tokens.length - 5}
        </Text>
      )}
    </HStack>
  </VStack>
);
