"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  Text,
  Box,
  Circle,
  HStack,
  DrawerContent,
  Flex,
  Button,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import { IoMdClose } from "react-icons/io";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Tokens from "./components/Tokens";
import Transactions from "./components/Transactions";
import { useAccount, useDisconnect } from "wagmi";
import { truncate } from "@/utils/address";
import Avatar from "@/assets/svg";

interface IModals {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

const ActivitiesModal: React.FC<IModals> = ({ isOpen, onClose, btnRef }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const balanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  function disconnectAndCloseModal() {
    disconnect();
    onClose();
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size={"sm"}
      blockScrollOnMount={true}
    >
      <DrawerContent border="1px solid #E7BFE7" background="#FDFDFD">
        {/* ----- Heading ----- */}
        <Box
          py="20px"
          px="20px"
          flexDir="column"
          bgImage={["/image/Header_image.png"]}
          bgSize={"cover"}
          bgPos={["", "inherit", "inherit"]}
        >
          {/* ----- Heading Account detail ----- */}
          <Flex justify="space-between">
            <HStack>
              <Avatar width={32} height={32} />
              <Text fontSize="16px" lineHeight="19.2px">
                {truncate(address || "")}
              </Text>
            </HStack>

            <Circle
              onClick={onClose}
              background="#018FE91A"
              borderRadius="50px"
              //@ts-ignore
              width="32px"
              height="32px"
              cursor="pointer"
            >
              <IoMdClose color="black" />
            </Circle>
          </Flex>

          <HStack mt="40px">
            <Text
              fontWeight={400}
              fontSize="24px"
              style={{ fontFamily: "Dellamor, sans-serif" }}
            >
              Balance
            </Text>

            <Box cursor="pointer" onClick={balanceVisibility}>
              {isBalanceVisible ? (
                <IoMdEye size="18px" color={COLORS.balTextColor} />
              ) : (
                <IoMdEyeOff size="18px" color={COLORS.balTextColor} />
              )}
            </Box>
          </HStack>

          <HStack>
            <Text
              fontWeight={400}
              fontSize="36px"
              color={COLORS.balTextColor}
              lineHeight="43.2px"
            >
              ${isBalanceVisible ? "305.68" : "****"}
            </Text>

            <Box
              background="#00BA8233"
              color="#00976A"
              py="10px"
              px="10px"
              borderRadius="28.5px"
            >
              <Text fontSize="12px" lineHeight="14.4px">
                +23.4%
              </Text>
            </Box>
          </HStack>
        </Box>

        <DrawerBody>
          <Tabs size="lg">
            <TabList justifyContent="center">
              <Tab
                color={COLORS.tabTextColor}
                _selected={{ color: "black", bg: "none", fontWeight: 700 }}
              >
                Tokens
              </Tab>
              <Tab
                color={COLORS.tabTextColor}
                _selected={{ color: "black", bg: "none", fontWeight: 700 }}
              >
                Transactions
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Tokens />
              </TabPanel>
              <TabPanel>
                <Transactions />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>

        <DrawerFooter>
          <Center
            as={Button}
            width="100%"
            bgColor="#FFDFE3"
            color="#E2001B"
            fontWeight={400}
            borderRadius="8px"
            h="40px"
            onClick={disconnectAndCloseModal}
            _hover={{
              bgColor: "#FFDFE3",
              color: "#E2001B",
            }}
          >
            Disconnect Wallet
          </Center>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ActivitiesModal;
