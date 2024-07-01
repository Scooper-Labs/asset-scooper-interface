"use client";

import React from "react";
import {
  Stack,
  Flex,
  Box,
  Image,
  Text,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import ModalComponent from "@/components/ModalComponent";
import Link from "next/link";

const TransactionComplete = ({
  isOpen,
  onClose,
  hash,
  Component,
}: {
  isOpen: boolean;
  onClose: () => void;
  hash: string;
  Component: React.JSX.Element;
}) => {
  return (
    <ModalComponent
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalCloseButton
        _hover={{
          bg: "none",
        }}
      />
      <Stack w="100%">
        <Flex justify="center" alignItems="center" flexDir="column">
          <Image src="/image/check_mark.png" w={"100px"} alt="an image" />

          <Box mt="25px">
            <Image src="/image/chain_batch.png" w={"200px"} alt="an image" />
          </Box>

          <Box>
            <Image
              src="/image/chain_batch_line.png"
              w={"200px"}
              alt="an image"
            />
          </Box>

          <Button
            color="blue"
            fontWeight={500}
            bgColor="transparent"
            border="1px dashed #018CE966"
            h="24px"
            py="6px"
          >
            <Box mr="5px">
              <Image
                src="/image/ethereum_logo_batc.png"
                w={"20px"}
                alt="an image"
              />
            </Box>
            {Component}
          </Button>

          <Box w={"100%"} textAlign="center">
            <Text fontWeight={600} mt="10px" fontSize="18px">
              Transaction completed
            </Text>
            <Text as="span" color="#676C87" fontSize="14px">
              Your transaction has been processed and{" "}
              <Text as="span" color="#151515" fontWeight={502}>
                {" "}
                {Component}{" "}
              </Text>
              has been deposited to your Wallet.
            </Text>

            <Button
              mt="25px"
              w="100%"
              color="white"
              bgColor="black"
              _hover={{
                bgColor: "black",
              }}
              fontWeight={400}
              fontSize="16px"
              h="48px"
              onClick={onClose}
            >
              <Link href={`https://basescan.org/tx/${hash}`} target="_blank">
                See Details
              </Link>
            </Button>
          </Box>
        </Flex>
      </Stack>
    </ModalComponent>
  );
};

export default TransactionComplete;
