import { useTokenLists } from "@/hooks/useTokens";
import { Box, Button, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import tokenList from "@/constants/baseTokenList.json";
import TokenSelectListRow from "./token-select-row";

function TokenSelectList() {
  console.log("token list json", tokenList);
  const vStackRef = useRef<HTMLDivElement | null>(null);
  const [_height, setHeight] = useState(0);
  const handleHeightCheck = () => {
    if (vStackRef.current) {
      const height = vStackRef.current.offsetHeight; // Access the height
      console.log("VStack height:", height);
      setHeight(height);
    } else {
      console.log("VStack ref not yet available");
    }
  };

  useEffect(() => {
    handleHeightCheck();
  }, [vStackRef]);

  return (
    <VStack
      borderTop="1px solid #F7E5F7"
      width="100%"
      height="341px"
      padding="1rem"
      overflowY="scroll"
      ref={vStackRef}
    >
      {/* <Button onClick={handleHeightCheck}>{_height ? _height : "e"}</Button> */}
      {tokenList.slice(0, 10).map((token, i) => {
        return (
          <Box key={i}>
            <TokenSelectListRow token={token} />
          </Box>
        );
      })}
    </VStack>
  );
}

export default TokenSelectList;
