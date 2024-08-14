import {
  Box,
  Stack,
  HStack,
  Link,
  Text,
  IconButton,
  Tag,
  TagLabel,
  Flex,
} from "@chakra-ui/react";
import { scooperSocialLinks } from "./data";
import ContainerWrapper from "@/components/ContainerWrapper";
import { SCOOPER_SVG } from "@/assets/svg";
import { COLORS } from "@/constants/theme";
import { LinkComponent } from "@/components/LinkComponent";

const Footer = () => {
  return (
    <Box color="white" border="1px solid #252525">
      <ContainerWrapper px="5%">
        <Stack
          spacing={6}
          display={{ base: "none", md: "none", lg: "flex" }}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          pt="20px"
        >
          {/* -------- Footer Logo -------- */}
          <HStack spacing={4}>
            {SCOOPER_SVG().Scooper_Logo()}
            <Text fontWeight="500" fontSize="18px">
              Asset Scooper
            </Text>
          </HStack>

          <HStack spacing={8} pt="20px">
            <Flex flexDir="column">
              <HStack>
                <Text fontSize="14px" fontWeight={500}>
                  Build
                </Text>

                {/* --------- coming soon ---------------- */}
                <Tag size="sm" colorScheme="red" borderRadius="full">
                  <TagLabel>coming soon</TagLabel>
                </Tag>
              </HStack>

              <LinkComponent href="#">
                <Text color={COLORS.tabTextColor}>Documentation</Text>
              </LinkComponent>
            </Flex>

            <Flex flexDir="column">
              <Text fontSize="14px" fontWeight={500}>
                Resources
              </Text>

              <LinkComponent href="https://mirror.xyz/0x41aDd734d7f63e01FCc336a4030817fdF643D754">
                <Text color={COLORS.tabTextColor}>Blog</Text>
              </LinkComponent>
            </Flex>

            <Flex flexDir="column">
              <Text fontWeight="500" fontSize="14px">
                Link
              </Text>
              <Link
                href="/app"
                color={COLORS.launchTextColor}
                fontSize="14px"
                fontWeight={500}
                boxShadow="0px 0px 5.8px -2.5px #E443CA66"
                style={{ textDecoration: "none" }}
              >
                Launch App
              </Link>
            </Flex>
          </HStack>
        </Stack>

        {/* ------------------------- Mobile Screen Footer ----------------------------- */}
        <Stack
          spacing={6}
          display={{ base: "block", md: "block", lg: "none" }}
          direction={{ base: "column", md: "column" }}
          justify="space-between"
          align="center"
          pt="20px"
        >
          {/* -------- Footer Logo -------- */}
          <Box>{SCOOPER_SVG().Scooper_Logo()}</Box>

          <HStack as="div" gap={20} mt="40px">
            <Flex flexDir="column">
              <HStack>
                <Text fontSize="14px" fontWeight={500}>
                  Build
                </Text>

                {/* --------- Docs coming soon ---------------- */}
                <Tag size="sm" colorScheme="red" borderRadius="full">
                  <TagLabel>coming soon</TagLabel>
                </Tag>
              </HStack>

              <LinkComponent href="#home">
                <Text color={COLORS.tabTextColor} mt="10px">
                  Documentation
                </Text>
              </LinkComponent>
            </Flex>

            <Flex as="div" flexDir="column">
              <Text fontWeight="500" fontSize="14px">
                Links
              </Text>
              <Link
                href="#home"
                color={COLORS.launchTextColor}
                fontSize="14px"
                fontWeight={500}
                boxShadow="0px 0px 5.8px -2.5px #E443CA66"
                style={{ textDecoration: "none" }}
                mt="10px"
              >
                Launch App
              </Link>
            </Flex>
          </HStack>

          <Flex flexDir="column" mt="30px">
            <Text fontSize="14px" fontWeight={500}>
              Resources
            </Text>

            <LinkComponent href="https://mirror.xyz/0x41aDd734d7f63e01FCc336a4030817fdF643D754">
              <Text color={COLORS.tabTextColor} mt="8px">
                Blog
              </Text>
            </LinkComponent>
          </Flex>
        </Stack>

        <Stack
          spacing={4}
          display={{ base: "none", md: "none", lg: "flex" }}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          color="white"
          mt="56px"
          pb="30px"
        >
          <Box flexDir="column">
            <HStack spacing={2}>
              {scooperSocialLinks.map((link) => (
                <IconButton
                  as="a"
                  href={link.url}
                  aria-label={link.ariaLabel}
                  icon={<link.icon color="white" />}
                  variant="ghost"
                  _hover={{
                    bg: "ghost",
                  }}
                  size="lg"
                  key={link.ariaLabel}
                />
              ))}
            </HStack>
            <Text color="white" fontSize="13px" fontWeight={400}>
              BUILT ON BASE
            </Text>
          </Box>
          <Text fontSize="sm">
            © {new Date().getFullYear()} Asset Scooper. All rights reserved.
          </Text>
        </Stack>

        {/* ------------------------- Mobile Screen Footer ----------------------------- */}
        <Stack
          spacing={4}
          display={{ base: "block", md: "block", lg: "none" }}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          color="white"
          mt="30px"
          pb="30px"
        >
          <HStack spacing={1}>
            {scooperSocialLinks.map((link) => (
              <IconButton
                as="a"
                href={link.url}
                aria-label={link.ariaLabel}
                icon={<link.icon color="white" />}
                variant="ghost"
                _hover={{
                  bg: "ghost",
                }}
                size="lg"
                key={link.ariaLabel}
              />
            ))}
          </HStack>

          <Text color="white" fontSize="13px" fontWeight={400}>
            BUILT ON BASE
          </Text>

          <Text fontSize="sm" mt="10px">
            {/* Made in Abuja, available to the 🌎 */}©{" "}
            {new Date().getFullYear()} Asset Scooper. All rights reserved.
          </Text>
        </Stack>
      </ContainerWrapper>
    </Box>
  );
};

export default Footer;
