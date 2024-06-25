import React from "react";
import {
  Box,
  Text,
  HStack,
  Flex,
  Heading,
  Image,
  Button,
} from "@chakra-ui/react";
import ContainerWrapper from "@/components/ContainerWrapper";
import { COLORS } from "@/constants/theme";
import Link from "next/link";

const SectionTwo = () => {
  return (
    <Box
      as="section"
      mt={{ base: "30px", md: "50px" }}
      bgImage={{
        base: "/image/Section_.png",
        md: "/image/Section_BG_Image.png",
      }}
      bgSize="cover"
      // bgPosition="center"
      bgRepeat="no-repeat"
    >
      <ContainerWrapper px="5%">
        <Flex
          alignItems={"center"}
          justify="space-between"
          flexDir={{ base: "column", md: "row" }}
        >
          <Box>
            <Text
              color="white"
              fontSize={{ base: "24px", md: "32px" }}
              fontWeight={600}
            >
              Get started using Asset Scooper today.
            </Text>
            <Button
              bg={COLORS.launchTextColor}
              as={Link}
              href="#home"
              color="white"
              width="102px"
              height="32px"
              fontSize="14px"
              fontWeight={400}
              mt="15px"
              borderRadius="8px"
              _hover={{
                bg: `${COLORS.launchTextColor}`,
              }}
            >
              Launch App
            </Button>
          </Box>

          {/* -------------- For Mobile -------------- */}
          <Box display={{ base: "none", md: "flex", lg: "flex" }}>
            <Image
              src="image/CTASection_illustration_image.png"
              alt="CTA_illustration_image"
            />
          </Box>

          <Box display={{ base: "block", md: "none", lg: "none" }}>
            <Image
              src="image/CTASection_illustration_mobile_image.png"
              alt="CTA_illustration_image"
              // w={"600px"}
              // h={"400px"}
            />
          </Box>
        </Flex>
      </ContainerWrapper>
    </Box>
  );
};

export default SectionTwo;
