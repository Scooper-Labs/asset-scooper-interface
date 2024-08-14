import React from "react";
import { SITE_EMOJI, SITE_INFO } from "@/utils/site";
import {
  Flex,
  Box,
  HStack,
  Text,
  Center,
  Divider,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { NetworkStatus } from "../NetworkStatus";
import { LinkComponent } from "../LinkComponent";
import ContainerWrapper from "../ContainerWrapper";
import { COLORS } from "@/constants/theme";
import { RiExternalLinkLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { tabs } from "@/assets/site";

export function AppFooter() {
  const pathname = usePathname();
  return (
    <Box
      bg={{ base: "#FCFCFD", md: `${COLORS.footerBGColor}` }}
      w="100%"
      h="72px"
      py="10px"
      mt="35px"
      borderTop={{ base: "1px solid #EDEEF2", md: "none" }}
    >
      <ContainerWrapper>
        {/* --------------------------- Mobile Screen -------------------- */}
        <Flex
          display={{ base: "flex", md: "none" }}
          as="footer"
          position="static"
          justify="space-between"
          align="center"
          color="neutral-content"
          p="4"
        >
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
                  fontWeight={pathname === e.link ? 600 : 400}
                  fontSize={["12px", "12px", "12px", "14px", "16px"]}
                >
                  {e.name}
                </Text>
              </HStack>
            </Link>
          ))}
        </Flex>

        {/* --------------------------- Desktop Screen ------------------- */}
        <Flex
          display={{ base: "none", md: "flex" }}
          as="footer"
          position="static"
          justify="space-between"
          align="center"
          bg="neutral"
          color="neutral-content"
          p="4"
        >
          <HStack>
            <Text fontWeight={500} fontSize="14px" color="#1D282A">
              {SITE_EMOJI} {SITE_INFO}
            </Text>

            <Tag size="md" colorScheme="red" borderRadius="full">
              <TagLabel>beta</TagLabel>
            </Tag>
          </HStack>

          <HStack>
            {/* --------------- Blog Link ----------------- */}
            <HStack>
              <Text color="#0E111B" fontSize="14px">
                Blog
              </Text>
              <LinkComponent href="https://mirror.xyz/0x41aDd734d7f63e01FCc336a4030817fdF643D754">
                <RiExternalLinkLine />
              </LinkComponent>
            </HStack>

            {/* --------------- About Us Link ----------------- */}
            <HStack>
              <Text color="#0E111B" fontSize="14px">
                About Us
              </Text>
              <LinkComponent href={`/`}>
                <RiExternalLinkLine />
              </LinkComponent>
            </HStack>

            <Center height="15px">
              <Divider orientation="vertical" border="1px solid #CDD9F2" />
            </Center>

            <Box>
              <NetworkStatus />
            </Box>
          </HStack>
        </Flex>
      </ContainerWrapper>
    </Box>
  );
}
