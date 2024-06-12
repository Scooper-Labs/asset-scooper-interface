"use client";

import { ProvidersProps } from "@/lib/components/types";
import type { FC } from "react";
import { ChakraProvider as Chakra } from "@chakra-ui/react";

const ChakraProvider: FC<ProvidersProps> = ({ children }) => {
  return <Chakra>{children}</Chakra>;
};

export default ChakraProvider;
