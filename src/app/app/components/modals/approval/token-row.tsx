"use client";
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
import React, { useEffect } from "react";
import { Address, erc20Abi, parseEther, parseUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { ClipLoader } from "react-spinners";
import { RxReload } from "react-icons/rx";
import { assetscooper_contract } from "@/constants/contractAddress";

function TokenRow({ token, refetch }: { token: Token; refetch: () => void }) {
  const {
    name,
    logoURI,
    address: tokenAddress,
    symbol,
    userBalance,
    decimals,
  } = token;
  const { address } = useAccount();
  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    isSuccess: isAllowanceSuccessLoad,
    refetch: refetchAllowance,
  } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as Address,
    functionName: "allowance",
    args: address ? [address, assetscooper_contract] : undefined,
  });

  const {
    write: approveToken,
    isPending: isApprovalPending,
    isConfirmed: isConfirmed,
    isConfirming,
  } = useAssetScooperContractWrite({
    fn: "approve",
    args: [assetscooper_contract, parseUnits(userBalance.toString(), decimals)],
    abi: erc20Abi,
    contractAddress: tokenAddress as Address,
  });
  const handleApprove = async () => {
    await approveToken();
  };

  const isApproved =
    !!allowance && allowance >= parseUnits(userBalance.toString(), decimals);
  const isLoading = isAllowanceLoading || isApprovalPending || isConfirming;

  console.log(isLoading, isAllowanceLoading, isApprovalPending, isConfirming);

  useEffect(() => {
    isConfirmed && refetch();
  }, [isConfirmed]);

  return (
    <HStack
      width="100%"
      justifyContent="space-between"
      padding="0.5rem"
      border="1px solid #B5B4C6"
      borderRadius="18px"
      shadow=""
    >
      <HStack alignItems="center" gap="8px">
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
      </HStack>

      <HStack alignItems="center">
        <Button
          onClick={handleApprove}
          isLoading={isLoading}
          isDisabled={isApproved}
        >
          {isApproved ? "Approved" : "Approve"}
        </Button>

        <Button onClick={() => refetchAllowance()}>
          {isLoading ? <ClipLoader size={15} /> : <RxReload size={15} />}
        </Button>
      </HStack>
    </HStack>
  );
}

export default TokenRow;
