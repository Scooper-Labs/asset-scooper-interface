import React from "react";
import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import TokenSelectListRow from "./token-select-row";
import { useAccount } from "wagmi";
import { MoralisAssetClass } from "@/utils/classes";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";

interface TokenSelectListProps {
  userWalletTokens: MoralisAssetClass[] | undefined;
  loading: boolean;
  error: boolean;
}

interface ListContentProps {
  address: string | undefined;
  loading: boolean;
  error: boolean;
  walletBalance: MoralisAssetClass[] | undefined;
}

function TokenSelectList({
  userWalletTokens,
  error,
  loading,
}: TokenSelectListProps) {
  const { address } = useAccount();

  return (
    <VStack
      borderTop="1px solid #F7E5F7"
      width="100%"
      height="341px"
      px="1rem"
      pb="1.4rem"
      overflowY="scroll"
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
      <ListContent
        address={address}
        loading={loading}
        error={error}
        walletBalance={userWalletTokens}
      />
    </VStack>
  );
}

const ListContent: React.FC<ListContentProps> = ({
  address,
  loading,
  error,
  walletBalance,
}) => {
  if (!address) {
    return (
      <Box>
        <Text>No tokens to see here, Kindly Connect Wallet</Text>
      </Box>
    );
  }

  if (loading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <RowSkeletonLoader key={i} />
        ))}
      </>
    );
  }

  if (error) {
    return (
      <Box>
        <Text>An error occurred while fetching balance</Text>
      </Box>
    );
  }
  if (!walletBalance) {
    return (
      <Box>
        <Text>An error occurred while fetching balance</Text>
      </Box>
    );
  }

  return (
    <>
      {walletBalance.map((token, i) => (
        <Box key={i} width="100%">
          <TokenSelectListRow token={token} />
        </Box>
      ))}
    </>
  );
};

const RowSkeletonLoader: React.FC = () => (
  <HStack width="100%" justifyContent="space-between">
    <HStack>
      <SkeletonCircle size="10" />
      <Skeleton height="20px" width="80px" />
    </HStack>
    <Skeleton height="20px" width="60px" />
  </HStack>
);

export default TokenSelectList;
