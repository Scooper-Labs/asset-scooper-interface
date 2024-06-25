import React from "react";
import { Text, HStack, Avatar, Flex, Heading, Stack } from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";

const tokens = [
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    price: "0.006 WBTC",
    priceInDollars: "$15.1",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "0.0032 ETH",
    priceInDollars: "$12.87",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },

  {
    symbol: "USDT",
    name: "Tether",
    price: "1.13 USDT",
    priceInDollars: "$3.87",
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },

  {
    symbol: "USDC",
    name: "USD Coin",
    price: "1.14 USDC",
    priceInDollars: "$15.1",
    logo: "https://cryptologos.cc/logos/usdcoin-usdc-logo.png",
  },
];

const Tokens = () => {
  return (
    <Stack>
      {tokens.map((token) => (
        <Flex justify="space-between" py="10px" key={nanoid()}>
          <HStack>
            <Avatar boxSize="32px" name={token.name} src={token.logo} />
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
              {token.price}
            </Heading>
            <Text fontSize="14px" color="#9E829F" fontWeight={400}>
              ~ {token.priceInDollars}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
};

export default Tokens;
