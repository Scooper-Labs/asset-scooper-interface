"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  Text,
  Box,
  Circle,
  Spinner,
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
  useBreakpointValue,
  DrawerOverlay,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import { IoMdClose } from "react-icons/io";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Tokens from "./Tokens";
import Transactions from "./Transactions";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { truncateAddress } from "@/utils/walletUtils";
import { useBalances } from "@/hooks/balances/useBalances";
import Avatar from "@/assets/svg";
import FormatNumber from "../FormatNumber";
import { useWalletsPortfolio } from "@/hooks/useMobula";
import { MoralisAssetClass } from "@/utils/classes";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_TX } from "@/utils/queries";
import { MdCheckCircleOutline } from "react-icons/md";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import Cookies from "js-cookie";
import CopyToClipboard from "react-copy-to-clipboard";
import { ClipLoader } from "react-spinners";
import { useSmartWallet } from "@/hooks/useSmartWallet";
import {
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import Link from "next/link";
import { useWalletsPortfolioMoralis } from "@/hooks/useMoralis";

interface IModals {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

const ActivitiesModal: React.FC<IModals> = ({ isOpen, onClose, btnRef }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
  const { address } = useAccount();

  const { data: portfolioBalance, isLoading: loadPortfolio } = useBalance({
    address,
  });

  const { disconnect } = useDisconnect();
  // const { data, loading: loadPortfolio } = useWalletsPortfolio();
  const { moralisAssets, isLoading } = useBalances({ address });
  const [userWalletTokens, setWT] = useState<MoralisAssetClass[]>([]);
  const [addressCopied, setAddressCopied] = useState<boolean>(false);

  const { isSmartWallet } = useSmartWallet();

  const {
    data: txns,
    loading,
    error,
  } = useQuery(GET_ACCOUNT_TX, {
    variables: { address },
  });

  useEffect(() => {
    if (moralisAssets) {
      setWT(moralisAssets);
    }
  }, [moralisAssets]);

  useEffect(() => {
    // Load the state from cookies on component mount
    const savedVisibility = Cookies.get("balanceVisibility");
    if (savedVisibility !== undefined) {
      setIsBalanceVisible(savedVisibility === "true");
    }
  }, []);

  const balanceVisibility = () => {
    setIsBalanceVisible((prev) => {
      const newState = !prev;
      // storing the newstate in cookies
      Cookies.set("balanceVisibility", newState.toString(), { expires: 7 }); // Expires in 7 days
      return newState;
    });
  };

  function disconnectAndCloseModal() {
    disconnect();
    onClose();
  }

  const drawerPlacement = useBreakpointValue<"bottom" | "right">({
    base: "bottom",
    md: "right",
  });

  return (
    <Drawer
      isOpen={isOpen}
      placement={drawerPlacement}
      onClose={onClose}
      finalFocusRef={btnRef}
      size={"sm"}
      blockScrollOnMount={true}
    >
      <DrawerOverlay
        display={{ base: "flex", md: "none" }}
        bg="#06081A80"
        backdropFilter="auto"
        backdropBlur="2px"
      />
      <DrawerContent
        border="1px solid #E7BFE7"
        background="#FDFDFD"
        borderRadius={{ base: "20px 20px 0px 0px", md: "0px" }}
      >
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
          <Flex flexDir="column">
            <Flex justify="space-between">
              <HStack>
                {/* -------------------- This is for EOA users --------------------- */}
                <Avatar width={32} height={32} />
                <CopyToClipboard
                  text={address ?? ""}
                  onCopy={() => {
                    setAddressCopied(true);
                    setTimeout(() => {
                      setAddressCopied(false);
                    }, 800);
                  }}
                >
                  <HStack>
                    <Text
                      fontSize="16px"
                      lineHeight="19.2px"
                      fontWeight={502}
                      color="#151829"
                      cursor="pointer"
                      _hover={{
                        cursor: "pointer",
                        color: "#9E829F",
                      }}
                    >
                      {truncateAddress(address || "")}
                    </Text>

                    {addressCopied ? (
                      <MdCheckCircleOutline
                        size={16}
                        aria-hidden="true"
                        color={COLORS.balTextColor}
                      />
                    ) : (
                      <HiOutlineDocumentDuplicate
                        size={16}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </HStack>
                </CopyToClipboard>
              </HStack>

              <HStack>
                <Center
                  display={{ base: "flex", md: "none" }}
                  as={Button}
                  width="95px"
                  bgColor="#FFDFE3"
                  py="10px"
                  px="10px"
                  color="#E2001B"
                  fontWeight={400}
                  borderRadius="104px"
                  h="29px"
                  onClick={disconnectAndCloseModal}
                  _hover={{
                    bgColor: "#FFDFE3",
                    color: "#E2001B",
                  }}
                >
                  Disconnect
                </Center>

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
              </HStack>
            </Flex>

            {/* ---------------------- This is for coinbase smart wallet users --------------------- */}
            {isSmartWallet ? (
              <Box
                mt="10px"
                as={Link}
                href="https://keys.coinbase.com"
                rel="noopener noreferrer"
                target="_blank"
                w="100%"
                borderRadius={"10px"}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="#00BA8233"
                color="#00976A"
                py="10px"
                px="10px"
              >
                <Text fontSize="12px">View your wallet</Text>
              </Box>
            ) : null}
          </Flex>

          <HStack mt="40px">
            <Text fontWeight={400} fontSize="24px" className="fontBalance">
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

          {loadPortfolio ? (
            <HStack spacing={2}>
              <Spinner size="sm" color="teal.500" />
              <Text fontSize="14px">Loading Balances</Text>
            </HStack>
          ) : (
            <HStack>
              <Text
                fontWeight={400}
                fontSize="36px"
                color={COLORS.balTextColor}
                lineHeight="43.2px"
              >
                {isBalanceVisible ? (
                  <FormatNumber
                    pre="$"
                    amount={portfolioBalance ? Number(portfolioBalance) : 0}
                  />
                ) : (
                  "****"
                )}
              </Text>

              {/* <Box
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
              </Box> */}
            </HStack>
          )}
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
                {isLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100px"
                  >
                    <ClipLoader size={30} color={"#4A90E2"} />
                    <Text ml={4}>Loading tokens...</Text>
                  </Box>
                ) : (
                  <Tokens userWalletTOKENS={userWalletTokens} />
                )}
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

        <DrawerFooter display={{ base: "none", md: "flex" }}>
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
