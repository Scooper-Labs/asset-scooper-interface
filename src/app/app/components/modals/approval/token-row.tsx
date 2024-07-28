"use client";

import { COLORS } from "@/constants/theme";
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
import { Address, erc20Abi, parseUnits } from "viem";
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

  // console.log(isApproved, allowance, userBalance);

  useEffect(() => {
    if (isConfirmed) {
      refetchAllowance();
      refetch();
    }
  }, [isConfirmed]);

  return (
    <HStack
      width="100%"
      justifyContent="space-between"
      padding="0.5rem 1rem"
      border="1px solid #E1C9E1"
      borderRadius="18px"
    >
      <HStack alignItems="center" gap="8px">
        <WrapItem>
          <Avatar size="xs" name={name} src={logoURI} />
        </WrapItem>

        <VStack gap="0" alignItems="start">
          <Text fontSize="14px" fontWeight="700">
            {symbol.length > 6 ? `${symbol.substring(0, 5)}...` : symbol}
          </Text>
          <Text color="#A8BBD6" fontSize="14px">
            {name}
          </Text>
        </VStack>
      </HStack>

      <HStack alignItems="center">
        <Button
          onClick={handleApprove}
          isLoading={isLoading}
          borderRadius="8px"
          isDisabled={isApproved}
          width="100%"
          color="#FDFDFD"
          fontSize="16px"
          fontWeight={500}
          bg={COLORS.btnGradient}
          _hover={{
            bg: COLORS.btnGradient,
          }}
        >
          {isApproved ? "Approved" : "Approve"}
        </Button>

        <Button onClick={() => refetchAllowance()}>
          {isLoading ? <ClipLoader size={20} /> : <RxReload size={20} />}
        </Button>
      </HStack>
    </HStack>
  );
}

export default TokenRow;
