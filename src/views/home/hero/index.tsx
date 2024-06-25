import React from "react";
import {
  Box,
  Image,
  Text,
  Tag,
  Flex,
  TagLabel,
  Heading,
  Button,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import Link from "next/link";
import ContainerWrapper from "@/components/ContainerWrapper";

const HeroSection = () => {
  return (
    <Box
      as="section"
      id="home"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      flexDir="column"
      bgImage={{
        base: "/image/Hero_BGImage_Mobile.png",
        md: "/image/Hero_BG_image.png",
      }}
      bgSize={"unset"}
      bgPos={"inherit"}
      // py={{ base: "18%", md: "12%", lg: "8%" }}
      pt={{ base: "70px", md: "100px", lg: "100px" }}
      //   minH={{ md: "94.5vh" }}
      //   mx={{ md: "25px" }}
      //   mb={{ md: "25px" }}
      color="white"
    >
      <ContainerWrapper px="5%">
        <Flex
          as="div"
          flexDir="column"
          alignItems="center"
          justify="center"
          textAlign="center"
        >
          <Tag
            size="lg"
            colorScheme="red"
            background={COLORS.tagBgColor}
            borderRadius="full"
            py="10px"
            px="20px"
          >
            <TagLabel
              color={COLORS.tabTextColor}
              fontWeight={400}
              fontSize="12px"
            >
              Built on base
            </TagLabel>
          </Tag>

          <Heading
            fontWeight={600}
            fontSize={{ base: "52px", md: "68px" }}
            mt="24px"
          >
            <Text as="span" color={COLORS.assetHeroTextColor}>
              Asset
            </Text>{" "}
            Scooper
          </Heading>

          <Text
            fontWeight={400}
            fontSize="18px"
            lineHeight="24.48px"
            color={COLORS.tabTextColor}
            mt="8px"
            // maxW={{ base: "400px", md: "700px" }}
            textAlign="center"
          >
            Efficiently Manage your crypto wallet, aggregate low-value assets
            and swap for a
          </Text>

          <Text
            fontWeight={400}
            fontSize="18px"
            lineHeight="24.48px"
            color={COLORS.tabTextColor}
            mt="1px"
            textAlign="center"
          >
            more valuable asset in a single transaction.
          </Text>

          <Button
            bg={COLORS.launchTextColor}
            as={Link}
            href="#home"
            color="white"
            height="32px"
            fontSize="14px"
            fontWeight={400}
            mt="24px"
            borderRadius="8px"
            _hover={{
              bg: `${COLORS.launchTextColor}`,
            }}
          >
            Launch App
          </Button>
        </Flex>

        <Flex mt="60px" justifyContent="center">
          <Box display={{ base: "none", md: "flex", lg: "flex" }}>
            <Image
              src={"image/Hero_BG_Desktop_Image.png"}
              // w={"600px"}
              // h={"400px"}
              alt="hero_illustration"
            />
          </Box>

          <Box display={{ base: "block", md: "none", lg: "none" }}>
            <Image
              src={"image/Hero_BG_Mobile_Image.png"}
              alt="hero_illustration"
            />
          </Box>
        </Flex>
      </ContainerWrapper>
    </Box>
  );
};

export default HeroSection;
