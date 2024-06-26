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
  Box,
  VStack,
} from "@chakra-ui/react";
import { use1inchApprovals } from "@/hooks/swap/use1inchApproval";
import { ChainId } from "@/constants";

import { useSelectedTokens } from "@/hooks/useSelectTokens";
import { useAccount } from "wagmi";
import TokenRow from "./token-row";
function ApprovalModal({
  tokensAllowanceStatus,
}: {
  tokensAllowanceStatus: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected, chainId, address } = useAccount();

  const { fetchApprovalData, isLoading, approvalCallDataArray } =
    use1inchApprovals(chainId as ChainId, address);
  const { isSelected, _selectToken, _unSelectToken, selectedTokens } =
    useSelectedTokens();

  return (
    <>
      <Button
        disabled={tokensAllowanceStatus}
        color="#fff"
        bg={tokensAllowanceStatus ? "#B5B4C6" : "#0099FB"}
        width="100%"
        onClick={() => {
          onOpen();
        }}
      >
        Approval
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Approve Tokens</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              {selectedTokens.map((token) => {
                return (
                  <Box key={token.address}>
                    <TokenRow token={token} />
                  </Box>
                );
              })}
            </VStack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ApprovalModal;
