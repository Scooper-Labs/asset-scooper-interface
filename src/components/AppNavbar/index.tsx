"use client";

import ContainerWrapper from "../ContainerWrapper";
import {
  Box,
  Text,
  HStack,
  useDisclosure,
  Center,
  Divider,
} from "@chakra-ui/react";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import ActivitiesModal from "../ActivitiesModal";

import LogoSvg from "@/assets/icons/LogoSVG.svg";
import { tabs } from "@/assets/site";
import ConnectButton from "../Buttons/connectButton";
import { CustomConnectButton } from "../Buttons/SmartWalletButton";
import { useAccount } from "wagmi";

const NavBar = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { isConnected } = useAccount();

  return (
    <Box bg="white" pos={"fixed"} w="100%" py="10px" zIndex={1000} top={0}>
      <ContainerWrapper>
        <HStack h={"55px"} justify={"space-between"}>
          <HStack>
            <Link href={"/"} role="logo_link" prefetch={false}>
              <Image alt="Logo" src={LogoSvg} />
            </Link>
            <Center height="20px">
              <Divider orientation="vertical" border="1px solid #EB65D566" />
            </Center>
            <HStack>
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
            <ConnectButton onOpen={onOpen} />
            {!isConnected && <CustomConnectButton />}
          </HStack>
        </HStack>

        <ActivitiesModal isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      </ContainerWrapper>
    </Box>
  );
};

export default memo(NavBar);
