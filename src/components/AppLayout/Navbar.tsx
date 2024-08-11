"use client";

import ContainerWrapper from "../ContainerWrapper";
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

import LogoSvg from "@/assets/icons/LogoSVG.svg";
import { tabs } from "@/assets/site";
import ConnectButton from "../Buttons/ConnectButton";
import { CustomConnectButton } from "../Buttons/SmartWalletButton";
import { useAccount } from "wagmi";
import { COLORS } from "@/constants/theme";

const NavBar = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { isConnected } = useAccount();

  return (
    <Box
      bg="white"
      pos={"fixed"}
      w="100%"
      py="10px"
      zIndex={1000}
      top={0}
      borderBottom={{
        base: `1px solid ${COLORS.appNavBarBorderColorM}`,
        md: `1px solid ${COLORS.appNavBarBorderColor}`,
      }}
    >
      <ContainerWrapper>
        <HStack
          h={"55px"}
          justify={"space-between"}
          //         width={{ base: "100%", md: "100%", lg: "430px" }}
          // height={{ base: "56px", md: "52px" }}
        >
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
