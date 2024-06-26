import React, { ReactNode, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { use1inchApprovals } from "@/hooks/swap/use1inchApproval";
import { ChainId } from "@/constants";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import assetscooperAbi from "@/constants/abi/assetscooper.json";
import { assetscooper_contract } from "@/constants/contractAddress";

import { useSelectedTokens } from "@/hooks/useSelectTokens";
import { Address, erc20Abi, parseUnits } from "viem";
import { useReadContract } from "wagmi";
function ApprovalModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected, chainId, address } = useAccount();

  const { fetchApprovalData, isLoading, approvalCallDataArray } =
    use1inchApprovals(chainId as ChainId, address);
  const { isSelected, _selectToken, _unSelectToken, selectedTokens } =
    useSelectedTokens();
  const {
    data: hash,
    isPending,
    isSuccess: isTrxSubmitted,
    isError: isWriteContractError,
    writeContract,
    error: WriteContractError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isWaitTrxError,
    error: WaitForTransactionReceiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  
  return (
    <>
      <Button
        onClick={() => {
          fetchApprovalData();
          onOpen();
        }}
      >
        Approval
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isConfirming && <Text>isConfirming...</Text>}
            {isPending && <Text>pending... confirm in wallet</Text>}
            <Button onClick={approveAllNew}>APPPROVE ALL</Button>
            <Button onClick={getAllowance}>Check Allowance</Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ApprovalModal;
