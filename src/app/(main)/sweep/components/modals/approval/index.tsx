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

import { useSelectedTokens } from "@/hooks/useSelectTokens";
import { useAccount } from "wagmi";
function ApprovalModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected, chainId, address } = useAccount();

  const { fetchApprovalData, isLoading, approvalCallDataArray } =
    use1inchApprovals(chainId as ChainId, address);
  const { isSelected, _selectToken, _unSelectToken, selectedTokens } =
    useSelectedTokens();


  
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
