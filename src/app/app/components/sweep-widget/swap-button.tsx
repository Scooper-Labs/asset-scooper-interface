"use client";

import { Button } from "@chakra-ui/react";
import { useSelectedTokens } from "@/hooks/useSelectTokens";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useReadContracts } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { erc20Abi, Address, formatUnits } from "viem";
import ConfirmationModal from "../modals/confirmation";
import {
  assetscooper_contract,
  PARASWAP_TRANSFER_PROXY,
} from "@/constants/contractAddress";
import { COLORS } from "@/constants/theme";
import { useSmartWallet } from "@/hooks/useSmartWallet";

function SweepButton() {
  const { open } = useWeb3Modal();
  const { isSmartWallet } = useSmartWallet();
  const { selectedTokens } = useSelectedTokens();

  const [tokensAllowance, setTokensAllowance] = useState(false);

  const { isConnected, address } = useAccount();

  //constructing approval call data for both smart wallet and eoa
  const contracts = selectedTokens.map((token) => ({
    abi: erc20Abi,
    address: token.address as Address,
    functionName: "allowance",
    args: [
      address,
      isSmartWallet
        ? (PARASWAP_TRANSFER_PROXY as Address)
        : (assetscooper_contract as Address),
    ],
  }));

  const { data, refetch, isSuccess } = useReadContracts({
    contracts,
  });

  const computeTokenAllowances = () =>
    data
      ? data.every((allowance, index) => {
          const userBalance = selectedTokens[index].userBalance;
          const decimals = selectedTokens[index].decimals;
          const _allowance = allowance.result ?? 0n;
          console.log(typeof _allowance);

          /* @ts-ignore */
          return Number(formatUnits(_allowance, decimals)) === userBalance;
        })
      : false;

  useEffect(() => {
    isSuccess && setTokensAllowance(computeTokenAllowances());
  }, [selectedTokens, data, address]);

  //ensuring it runs at first load
  useEffect(() => {
    isSuccess && setTokensAllowance(computeTokenAllowances());
  }, []);

  return (
    <>
      {!isConnected ? (
        <Button
          mt="20px"
          w={{ base: "100%", md: "455px" }}
          bg={COLORS.sweepBGColor}
          _hover={{
            bg: `${COLORS.sweepBGColor}`,
          }}
          h="48px"
          color="white"
          fontWeight={400}
          borderRadius="8px"
          onClick={() => open({ view: "Connect" })}
        >
          Connect wallet
        </Button>
      ) : (
        <>
          {selectedTokens.length > 0 ? (
            <>
              <ConfirmationModal
                tokensAllowanceStatus={tokensAllowance}
                refetch={refetch}
              />
            </>
          ) : (
            <>
              <Button
                mt="20px"
                w="100%"
                bg={COLORS.sweepBGColor}
                _hover={{
                  bg: `${COLORS.sweepBGColor}`,
                }}
                h="48px"
                color="white"
                fontWeight={400}
                borderRadius="8px"
              >
                Select tokens
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}
// InfoOutlineIcon
export default SweepButton;
