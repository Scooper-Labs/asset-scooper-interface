"use client";

import React from "react";
import {
  Text,
  HStack,
  Image,
  Button,
  Flex,
  Heading,
  Stack,
  Circle,
} from "@chakra-ui/react";
import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";
import { TXN_Interface } from "@/utils/interface";
import { ApolloError } from "@apollo/client";
import { groupTransactionsByBlock } from "@/utils/classes";
import { formatEther } from "viem";

interface ITransactions {
  txns: TXN_Interface[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

function Transactions({ txns, loading, error }: ITransactions) {
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (txns === undefined || txns.length === 0)
    return (
      <>
        <Flex mt="20px" justify="center" alignItems="center" flexDir="column">
          <Image
            src="/image/Transaction_not_found_svg.png"
            w={"80px"}
            alt="an image"
          />
          <Text mt="20px" color="#9E829F" fontSize="14px">
            No Transaction Found
          </Text>
        </Flex>
      </>
    );

  const transactions = groupTransactionsByBlock(txns);
  return (
    <Stack>
      {transactions.map((txn) => (
        <Flex
          justify="space-between"
          py="15px"
          key={txn.transactionHash}
          borderBottom="1px"
          borderColor="#E7F4F7"
        >
          <HStack>
            <Circle>
              <Image
                alt=""
                src={"/image/sweeptransactionIcon.png"}
                width={35}
                height={35}
              />
            </Circle>
            <Flex flexDir="column">
              <Heading fontSize="15px" fontWeight={500}>
                Swept {txn.tokensIn.length} token(s) into{" "}
                {(parseFloat(txn.amountsOut[0]) || 0).toFixed(6)} WETH
              </Heading>
              <Text fontSize="13px" color="#9E829F">
                {txn.time}
              </Text>
            </Flex>
          </HStack>

          <Button
            as={Link}
            href={`https://basescan.org/tx/${txn.transactionHash}`}
            target="_blank"
            bg="none"
            _hover={{
              bg: "none",
            }}
          >
            <HiExternalLink color="#940CFF" size="22px" />
          </Button>
        </Flex>
      ))}
    </Stack>
  );
}

export default Transactions;
