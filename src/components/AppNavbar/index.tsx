import ContainerWrapper from "../ContainerWrapper";
import {
  Box,
  Text,
  HStack,
  useDisclosure,
  useToast,
  Center,
  Divider,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { usePathname, useRouter } from "next/navigation";
import { memo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import Image from "next/image";
import ActivitiesModal from "../ActivitiesModal";
import { COLORS } from "@/constants/theme";

import LogoSvg from "@/assets/icons/LogoSVG.svg";
import { tabs } from "@/assets/site";
import ConnectButton from "../Buttons/connectButton";
import { CustomConnectButton } from "../Buttons/SmartWalletButton";

const NavBar = () => {
  let toast = useToast();

  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Box
      bg="white"
      // border="1px solid red"
      pos={"fixed"}
      w="100%"
      py="10px"
      zIndex={1000}
      top={0}
    >
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
              {tabs?.map((e, i) => (
                <Link
                  href={i === 4 ? "" : e.link}
                  key={nanoid()}
                  prefetch={false}
                >
                  <HStack
                    // opacity={i === 4 ? 0.3 : 1}
                    px="10px"
                    py="5px"
                    borderRadius={"50px"}
                    color={
                      pathname?.includes(e.link)
                        ? "#9E829F"
                        : pathname === "/" && e.link === "/sweep"
                        ? "#9E829F"
                        : "#9E829F"
                    }
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
            <ConnectButton />
            <CustomConnectButton />
          </HStack>
        </HStack>

        <ActivitiesModal isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      </ContainerWrapper>
    </Box>
  );
};

export default memo(NavBar);
