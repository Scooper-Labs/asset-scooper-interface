import { ChainId, ONEINCH_ROUTER_ADDRESSES } from "@/constants";
import { useAssetScooperContractWrite } from "@/hooks/useAssetScooperWriteContract";
import { Token } from "@/lib/components/types";
import {
  HStack,
  WrapItem,
  Avatar,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Address, erc20Abi, parseEther } from "viem";
import { useAccount, useReadContract } from "wagmi";

function TokenRow({ token }: { token: Token }) {
  const { name, logoURI, address: tokenAddress, symbol, userBalance } = token;
  const { address, chainId } = useAccount();
  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    isSuccess: isAllowanceSuccessLoad,
  } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as Address,
    functionName: "allowance",
    args:
      address && chainId
        ? [
            address,
            ONEINCH_ROUTER_ADDRESSES[chainId ? (chainId as ChainId) : 8453],
          ]
        : undefined,
  });

  const {
    write: approveToken,
    isPending: isApprovalPending,
    isConfirmed: isConfirmed,
    isWriteContractError: isApprovalError,
  } = useAssetScooperContractWrite({
    fn: "approve",
    args: [
      ONEINCH_ROUTER_ADDRESSES[chainId as ChainId],
      parseEther(userBalance.toString()),
    ],
    abi: erc20Abi,
    contractAddress: tokenAddress as Address,
  });
  const handleApprove = () => {
    approveToken();
  };

  const isApproved =
    !!allowance && allowance >= parseEther(userBalance.toString());
  const isLoading = isAllowanceLoading || isApprovalPending;
  return (
    <HStack>
      <WrapItem>
        <Avatar size="xs" name={name} src={logoURI} />
      </WrapItem>

      <VStack gap="0" alignItems="start">
        <Text fontWeight="700">
          {symbol.length > 6 ? `${symbol.substring(0, 5)}...` : symbol}
        </Text>
        <Text color="#A8BBD6" fontSize="smaller">
          {name}
        </Text>
      </VStack>

      <Button
        onClick={handleApprove}
        isLoading={isLoading}
        isDisabled={isApproved}
      >
        {isApproved ? "Approved" : "Approve"}
      </Button>
    </HStack>
  );
}

export default TokenRow;
