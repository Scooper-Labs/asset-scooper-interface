import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import TokenSelectListRow from "./token-select-row";
import { useBalances } from "@/hooks/balances/useBalances";
import { useAccount } from "wagmi";
import { AssetClass } from "@/utils/classes";

function TokenSelectList({
  userWalletTokens,
}: {
  userWalletTokens: AssetClass[] | undefined;
}) {
  const { address } = useAccount();

  const xxx = useBalances({
    account: address ?? "",
  });

  return (
    <VStack
      borderTop="1px solid #F7E5F7"
      width="100%"
      height="341px"
      px="1rem"
      pb="1.4rem"
      overflowY="scroll"
      // ref={vStackRef}
      gap="12px"
    >
      <HStack
        fontSize="smaller"
        padding="0.5rem"
        color="#9E829F"
        justifyContent="space-between"
        width="100%"
      >
        <Text>Tokens</Text> <Text>Value</Text>
      </HStack>
      {userWalletTokens?.map((token, i) => {
        return (
          <Box key={i} width="100%">
            <TokenSelectListRow token={token} />
          </Box>
        );
      })}
    </VStack>
  );
}

export default TokenSelectList;
