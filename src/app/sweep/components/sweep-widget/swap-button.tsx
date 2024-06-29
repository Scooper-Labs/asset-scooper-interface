import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useSelectedTokens } from "@/hooks/useSelectTokens";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { use1inchSwap } from "@/hooks/swap/use1inchSwap";
import { ChainId } from "@/constants";
import SwapModal from "../modals/confirmation";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import ApprovalModal from "../modals/approval";
import { useReadContracts } from "wagmi";
import { erc20Abi, Address, parseUnits, formatUnits } from "viem";
import ConfirmationModal from "../modals/confirmation";

const spenderAddress = "0x111111125421ca6dc452d289314280a0f8842a65";

function SweepButton() {
  const { selectedTokens } = useSelectedTokens();

  const [tokensAllowance, setTokensAllowance] = useState(false);

  const { isConnected, chainId, address } = useAccount();
  const contracts = selectedTokens.map((token) => ({
    abi: erc20Abi,
    address: token.address as Address,
    functionName: "allowance",
    args: [address, spenderAddress as Address], // You'll need to provide these
  }));

  const { data, isLoading, refetch, isSuccess, isError } = useReadContracts({
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
    console.log("computeTokenAllowances", data);
    isSuccess && setTokensAllowance(computeTokenAllowances);
  }, [isSuccess, isLoading, data]);

  console.log("tokensAllowanceStatus", computeTokenAllowances, data);

  useEffect(() => {
    refetch();
    setTokensAllowance(computeTokenAllowances);
  }, [chainId, isLoading]);

  return (
    <>
      {!isConnected ? (
        <Button>Connect wallet</Button>
      ) : (
        <>
          {selectedTokens.length > 0 ? (
            <>
              <ConfirmationModal
                tokensAllowanceStatus={tokensAllowance}
                refetch={refetch}
              />
              {/* <Button onClick={() => refetch()}>Reftch Allowances</Button> */}
            </>
          ) : (
            <>
              <Button width="100%" bg="#B5B4C6" color="#fff">
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