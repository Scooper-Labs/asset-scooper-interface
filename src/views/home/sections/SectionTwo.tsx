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
    <Box>
      <ContainerWrapper>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text color="white" fontSize="32px" fontWeight={700}>
              Get started using Asset Scooper today.
            </Text>
            <Button
              bg={COLORS.launchTextColor}
              as={Link}
              href="/sweep"
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
              Get Started
            </Button>
          </Box>

          <Box>
            <Image
              src="image/CTASection_illustration_image.png"
              alt="CTA_illustration_image"
            />
          </Box>
        </Flex>
      </ContainerWrapper>
    </Box>
  );
};

export default SectionTwo;
