"use client";

import React, { useEffect, useState } from "react";
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
import { useBalances } from "@/hooks/balances/useBalances";
import Avatar from "@/assets/svg";
import FormatNumber from "../FormatNumber";
import { useWalletsPortfolio } from "@/hooks/useMobula";
import { AssetClass } from "@/utils/classes";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_TX } from "@/utils/queries";

interface IModals {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

const ActivitiesModal: React.FC<IModals> = ({ isOpen, onClose, btnRef }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data } = useWalletsPortfolio();
  const [userWalletTokens, setUserWalletTokens] = useState<AssetClass[]>([]);

  const {
    data: txns,
    loading,
    error,
  } = useQuery(GET_ACCOUNT_TX, {
    variables: { address },
  });

  useEffect(() => {
    if (data) {
      setUserWalletTokens(data.assets);
    }
  }, [data]);

  useBalances({ account: address ?? "" });

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
              {isBalanceVisible ? (
                <FormatNumber pre="$" amount={data ? data.balance : 0} />
              ) : (
                "****"
              )}
            </Text>
            <Box
              background="#00BA8233"
              color="#00976A"
              py="10px"
              px="10px"
              borderRadius="28.5px"
            >
              <Text fontSize="12px" lineHeight="14.4px">
                <FormatNumber
                  pre={data ? (data.realized_pnl > 0 ? "-" : "+") : ""}
                  amount={data ? data.realized_pnl : 0}
                  suf="%"
                />
              </Text>
            </Box>
          </HStack>
        </Box>

        <DrawerBody>
          <Tabs size="lg">
            <TabList justifyContent="flexStart">
              <Tab
                color={COLORS.tabTextColor}
                _selected={{ color: "#2C333B", bg: "none", fontWeight: 700 }}
                fontWeight={400}
              >
                Tokens
              </Tab>
              <Tab
                color={COLORS.tabTextColor}
                _selected={{ color: "#2C333B", bg: "none", fontWeight: 700 }}
                fontWeight={400}
              >
                Transactions
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Tokens userWalletTOKENS={userWalletTokens} />
              </TabPanel>
              <TabPanel>
                <Transactions
                  txns={txns?.tokenSwappeds}
                  loading={loading}
                  error={error}
                />
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
