import {
  Button,
  Flex,
  Text,
  HStack,
  VStack,
  Checkbox,
  CheckboxGroup,
  Box,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import { FaArrowRight } from "react-icons/fa";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export function TokenSelectFooter() {
  return (
    <Flex
      borderRadius={10}
      width="full"
      background="white"
      py="1rem"
      overflow="hidden"
      justify="space-between"
      padding="1rem"
    >
      <Text color="#EFE6EF" fontSize="larger">
        ~0
      </Text>

      <HStack>
        <Button
          alignContent="center"
          border="1px solid #D0D5DD"
          borderRadius={10}
          color="#A8BBD6"
          fontWeight="400"
        >
          <Checkbox />
          <Text marginLeft="5px">Select All</Text>
        </Button>
        <Button background="#B5B4C6" borderRadius={10}>
          <FaArrowRight size={15} color="#fff" />
        </Button>
      </HStack>
    </Flex>
  );
}
