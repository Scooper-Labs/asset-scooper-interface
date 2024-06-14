import React from "react";
import {
  Text,
  HStack,
  Avatar,
  Button,
  Flex,
  Heading,
  Stack,
  Circle,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { nanoid } from "@reduxjs/toolkit";
import { HiExternalLink } from "react-icons/hi";
import SweepTransactionIcon from "@/assets/icons/sweeptransactionIcon.png";
import SwapTransactionIcon from "@/assets/icons/swaptransactionIcon.png";
import TransferTransactionIcon from "@/assets/icons/transfertransactionIcon.png";
import ReceivedTransactionIcon from "@/assets/icons/receivedtransactionIcon.png";

const transactions = [
  {
    icon: SweepTransactionIcon,
    transactiontitle: "Sweep contract executed",
    transactiondate: "1 June, 2024",
    externallink: "#",
  },
  {
    icon: SwapTransactionIcon,
    transactiontitle: "134 DEGEN swapped for 4502 WEGEN",
    transactiondate: "1 June, 2024",
    externallink: "#",
  },

  {
    icon: TransferTransactionIcon,
    transactiontitle: "0.16 ETH transfered to 0x016...28a2",
    transactiondate: "1 June, 2024",
    externallink: "#",
  },

  {
    icon: ReceivedTransactionIcon,
    transactiontitle: "0.16 ETH received from 0x016...28a2",
    transactiondate: "1 June, 2024",
    externallink: "#",
  },
];

const Transactions: React.FC = () => {
  return (
    <Stack>
      {transactions.map((transaction) => (
        <Flex
          justify="space-between"
          py="15px"
          key={nanoid()}
          borderBottom="1px"
          borderColor="#E7F4F7"
        >
          <HStack>
            <Circle>
              <Image alt="" src={transaction.icon} width={35} height={35} />
            </Circle>
            <Flex flexDir="column">
              <Heading fontSize="15px" fontWeight={500}>
                {transaction.transactiontitle}
              </Heading>
              <Text fontSize="13px" color="#9E829F">
                {transaction.transactiondate}
              </Text>
            </Flex>
          </HStack>

          <Button
            as={Link}
            href={transaction.externallink}
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
};

export default Transactions;
