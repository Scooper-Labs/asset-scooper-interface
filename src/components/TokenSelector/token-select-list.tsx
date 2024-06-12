import { useTokenLists } from "@/hooks/useTokens";
import { Box } from "@chakra-ui/react";
import React from "react";

function TokenSelectList() {
  const { data } = useTokenLists({ chainId: 8453 });
  console.log("tokenList", data);
  return <Box height="370px">Hello World</Box>;
}

export default TokenSelectList;
