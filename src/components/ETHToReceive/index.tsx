import { Skeleton, Flex } from "@chakra-ui/react";
import { useEthPrice } from "@/hooks/useGetETHPrice2";
import { ETH_ADDRESS } from "@/utils";
import { Token } from "@/lib/components/types";
import FormatNumber from "@/components/FormatNumber";

export function ETHToReceive({ selectedTokens }: { selectedTokens: Token[] }) {
  const { ethPrice, isLoading } = useEthPrice({
    address: ETH_ADDRESS,
  });

  const quoteAllTokens = selectedTokens.reduce(
    (total, selectedToken) => total + selectedToken?.quoteUSD,
    0
  );

  return (
    <Flex fontSize="14px">
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={0.5}
        speed={1.2}
        startColor="#E7BFE7"
        endColor="#9E829F"
        width="100%"
        height="2em"
      >
        {ethPrice === 0 ? (
          "__"
        ) : (
          <FormatNumber amount={quoteAllTokens / ethPrice} suf="ETH" />
        )}
      </Skeleton>
    </Flex>
  );
}
