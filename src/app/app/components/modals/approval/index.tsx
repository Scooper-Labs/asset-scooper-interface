"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  VStack,
} from "@chakra-ui/react";
import { useSelectedTokens } from "@/hooks/useSelectTokens";
import TokenRow from "./token-row";

function ApprovalModal({
  tokensAllowanceStatus,
  refetch,
}: {
  tokensAllowanceStatus: boolean;
  refetch: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedTokens } = useSelectedTokens();

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
            <VStack width="100%" gap="4px">
              {selectedTokens.map((token) => (
                <Box width="100%" key={token.address}>
                  <TokenRow token={token} refetch={refetch} />
                </Box>
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                refetch();
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ApprovalModal;
