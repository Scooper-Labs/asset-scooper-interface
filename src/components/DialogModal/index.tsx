"use client";

import {
  Button,
  Stack,
  Center,
  Flex,
  Text,
  Box,
  chakra,
} from "@chakra-ui/react";
import ModalComponent from "../ModalComponent/TabViewModal";
import { COLORS } from "@/constants/theme";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogModal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalComponent
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      modalContentStyle={{
        py: "0px",
      }}
    >
      <Stack w="100%">
        <Box
          py="10px"
          // px="10px"
          flexDir="column"
          bgImage={["/image/approve_images.png"]}
          bgSize={"contain"}
          bgPos={"center"}
          bgRepeat={"no-repeat"}
          h="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Center
            bgColor="#0172EF"
            border="2px solid #101010"
            borderRadius="80px"
            w="148px"
            h="49px"
            color="white"
            fontSize="14px"
            fontWeight={700}
          >
            Approve All (48)
          </Center>
        </Box>
        <Flex flexDir="column" justify="center" alignItems="center">
          <Text
            color="#0D0D0D"
            fontWeight={700}
            fontSize="14px"
            textAlign="center"
          >
            Feature Under Development
          </Text>
          <Text
            fontWeight={500}
            fontSize="14px"
            color="#676C87"
            width="100%"
            textAlign="center"
          >
            You can currently sweep your assets (batch all your assets in a
            single transaction) using the{" "}
            <chakra.span fontWeight={700}>base smart wallet </chakra.span>{" "}
            feature on Asset Scooper.
          </Text>

          <Text
            fontWeight={500}
            fontSize="14px"
            color="#676C87"
            width="100%"
            mt="15px"
            textAlign="center"
          >
            Please note that when sweeping tokens with EOA wallets (e.g.,
            Metamask), you currently need to approve your tokens multiple times.
          </Text>
        </Flex>
        <Button
          mt="10px"
          width="100%"
          bg={COLORS.btnGradient}
          _hover={{
            bg: `${COLORS.btnGradient}`,
          }}
          boxShadow={COLORS.boxShadowColor}
          color="#fff"
          fontWeight={400}
          fontSize="16px"
          onClick={() => {
            onClose();
          }}
          mb="10px"
        >
          Close
        </Button>
      </Stack>
    </ModalComponent>
  );
};

export default DialogModal;
