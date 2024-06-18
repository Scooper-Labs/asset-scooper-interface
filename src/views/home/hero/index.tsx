import React from "react";
import {
  Box,
  Image,
  Text,
  Tag,
  TagLabel,
  Heading,
  Button,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import Link from "next/link";

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
      bgImage={["/image/Hero_BG_image.png"]}
      bgSize={"cover"}
      bgPos={["", "inherit", "inherit"]}
      py="8%"
      //   minH={{ md: "94.5vh" }}
      //   mx={{ md: "25px" }}
      //   mb={{ md: "25px" }}
      color="white"
    >
      <Tag
        size="lg"
        colorScheme="red"
        background={COLORS.tagBgColor}
        borderRadius="full"
        py="10px"
        px="20px"
      >
        <TagLabel color={COLORS.tabTextColor} fontWeight={400} fontSize="12x">
          Built on base
        </TagLabel>
      </Tag>

      <Heading fontWeight={600} fontSize="68px" mt="24px">
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
        maxW="700px"
        textAlign="center"
      >
        Efficiently Manage your crypto wallet, aggregate low-value assets and
        swap for a more valuable asset in a single transaction.
      </Text>

      <Button
        bg={COLORS.launchTextColor}
        as={Link}
        href="/sweep"
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

      <Box mt="30px" mb="-150px">
        <Image
          src="image/Hero_illustration_SVG.png"
          w={"600px"}
          h={"400px"}
          alt="hero_illustration"
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
