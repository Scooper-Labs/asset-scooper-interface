"use client";

import { COLORS } from "@/constants/theme";
import {
  Button,
  useDisclosure,
  Box,
  Text,
  VStack,
  Stack,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import TokenRow from "./TokenRow";
import { IoMdClose } from "react-icons/io";
import ModalComponent from "@/components/ModalComponent/TabViewModal";
import useSelectToken from "@/hooks/useSelectToken";

function ApprovalModal({
  tokensAllowanceStatus,
  refetch,
}: {
  tokensAllowanceStatus: boolean;
  refetch: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tokenList: selectedTokens } = useSelectToken();

  return (
    <>
      <Button
        disabled={tokensAllowanceStatus}
        borderRadius="8px"
        width="100%"
        color="#FDFDFD"
        fontSize="16px"
        fontWeight={400}
        bg={
          tokensAllowanceStatus
            ? `${COLORS.inputBgcolor}`
            : `${COLORS.btnGradient}`
        }
        _hover={{
          bg: tokensAllowanceStatus
            ? `${COLORS.inputBgcolor}`
            : `${COLORS.btnGradient}`,
        }}
        onClick={() => onOpen()}
      >
        Approval
      </Button>

      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        modalContentStyle={{ py: "0" }}
      >
        <Flex justify="space-between" alignItems="center">
          <Box flex="1" textAlign="center">
            <Text fontWeight={700} fontSize="14px" color="#0D0D0D">
              Approve Token
            </Text>
          </Box>

          <IconButton
            aria-label="close-btn"
            icon={<IoMdClose size="24px" color="#0D0D0D" />}
            onClick={onClose}
            bg="none"
            _hover={{
              bg: "none",
            }}
          />
        </Flex>

        <Stack w="100%" mt="15px">
          <VStack width="100%" gap="4px" position="relative">
            {selectedTokens.map((token) => (
              <Box width="100%" key={token.address}>
                <TokenRow token={token} refetch={refetch} />
              </Box>
            ))}
          </VStack>
        </Stack>
      </ModalComponent>
    </>
  );
}

export default ApprovalModal;
