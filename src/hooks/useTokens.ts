import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { TOKEN_LISTS } from "@/constants/token-lists";
import { tokenListValidator } from "@/utils/tokenListValidator";

interface UseOtherTokenListsParams {
  chainId?: 8453 | 84532;
}

export const isPromiseFulfilled = <T>(
  input: PromiseSettledResult<T>,
): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

export const useTokenLists = ({ chainId }: UseOtherTokenListsParams) => {
  const tokenListQuery = useQuery({
    queryKey: ["TokenLists", { chainId }],
    queryFn: async () => {
      const res = await Promise.allSettled(
        TOKEN_LISTS.map((el) => fetch(el).then((res) => res.json())),
      ).then((res) => {
        return res.filter(isPromiseFulfilled).map((el) => {
          el.value;
          // console.log("this is other tokens", el.value);
        });
      });
      return res
        .map((el) => tokenListValidator.parse(el))
        .flatMap((el) => el.tokens);
    },
    // keepPreviousData: true,
    placeholderData: keepPreviousData,
    staleTime: 900000, // 15 mins
    gcTime: 86400000, // 24hs
    enabled: Boolean(chainId),
    refetchOnWindowFocus: true,
  });

  return {
    data: tokenListQuery,
  };
};
