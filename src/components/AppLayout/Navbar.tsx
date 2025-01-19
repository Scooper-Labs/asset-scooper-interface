"use client";

import ContainerWrapper from "../ContainerWrapper";
import { useState } from "react";
import {
  Box,
  Text,
  HStack,
  useDisclosure,
  Center,
  Divider,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import ActivitiesModal from "../ActivitiesModal";
import { ModalType, INavActions } from "./navigation/types";
import { networks } from "@/config/switchchain/config";

import { useWeb3Modal } from "@web3modal/wagmi/react";

import LogoSvg from "@/assets/icons/LogoSVG.svg";
import { tabs } from "@/assets/site";
import ConnectButton from "../Buttons/ConnectButton";
import { CustomConnectButton } from "../Buttons/SmartWalletButton";
import { useAccount } from "wagmi";
import { COLORS } from "@/constants/theme";
import Right from "./navigation/right";

const NavBar = () => {
  const { address, chainId, isConnected } = useAccount();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const [modalType, setModalType] = useState<ModalType>();

  const { open } = useWeb3Modal();

  const connectedNetwork = networks.find((chain) => chain.chainId === chainId);
  const network = connectedNetwork?.variant || "base";

  const closeModal = () => setModalType(undefined);

  const handleModal = (type: ModalType) => {
    if (type === "wallet" && !address) {
      return;
    }

    setModalType(type);
  };

  const actionItems: INavActions = [
    {
      text: undefined,
      variant: "account",
    },
    {
      variant: "network",
    },
  ];

  return (
    <Box
      bg="white"
      pos={"fixed"}
      w="100%"
      py="10px"
      zIndex={10}
      top={0}
      borderBottom={{
        base: `1px solid ${COLORS.appNavBarBorderColorM}`,
        md: `1px solid ${COLORS.appNavBarBorderColor}`,
      }}
    >
      <ContainerWrapper>
        <HStack h={"55px"} justify={"space-between"}>
          <HStack>
            <HStack>
              <Link href={"/"} role="logo_link" prefetch={false}>
                <Image alt="Logo" src={LogoSvg} />
              </Link>

              <Tag
                display={{ base: "none", md: "flex" }}
                size="md"
                colorScheme="red"
                borderRadius="full"
              >
                <TagLabel>beta</TagLabel>
              </Tag>
            </HStack>

            <Center height="20px" display={{ base: "none", md: "flex" }}>
              <Divider orientation="vertical" border="1px solid #EB65D566" />
            </Center>
            <HStack display={{ base: "none", md: "flex" }}>
              {tabs.map((e, i) => (
                <Link href={e.link} key={i} prefetch={false}>
                  <HStack
                    opacity={pathname === e.link ? 1 : 0.5}
                    px="10px"
                    py="5px"
                    borderRadius={"50px"}
                    color={pathname === e.link ? "#006DED" : "#9E829F"}
                    _hover={{ opacity: 1 }}
                  >
                    <Text
                      fontWeight={500}
                      fontSize={["12px", "12px", "12px", "14px", "16px"]}
                    >
                      {e.name}
                    </Text>
                  </HStack>
                </Link>
              ))}
            </HStack>
          </HStack>
          <HStack>
            {/* -------- Right Component is where the multichain network popover can be found -------- */}
            {isConnected && (
              <Right actionItems={actionItems} handleModal={handleModal} />
            )}

            <ConnectButton onOpen={onOpen} />

            {!isConnected && <CustomConnectButton />}
          </HStack>
        </HStack>

        <ActivitiesModal
          isOpen={isOpen}
          onClose={onClose}
          //@ts-ignore
          btnRef={btnRef}
        />
      </ContainerWrapper>
    </Box>
  );
};

export default memo(NavBar);
