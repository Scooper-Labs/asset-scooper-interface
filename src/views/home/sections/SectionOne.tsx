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

const SectionOne = () => {
  return (
    <Box>
      <ContainerWrapper>
        <Flex justify="center" flexDir="column">
          <Heading
            color="#ffff"
            textAlign="center"
            fontWeight={600}
            fontSize="32px"
            mb="50px"
          >
            Key Features
          </Heading>

          <HStack>
            <Box
              h="full"
              w="60%"
              border={`1px solid ${COLORS.borderColorLanding}`}
              borderRadius="16px"
              py="20px"
              px="20px"
            >
              <Flex flexDir="column">
                <Text color="white" fontWeight={700} lineHeight="17.6px">
                  Wallet Optimisation
                </Text>

                <Text
                  fontWeight={500}
                  fontSize="18px"
                  lineHeight="24.48px"
                  color={COLORS.tabTextColor}
                  mt="16px"
                  maxW="500px"
                  textAlign="left"
                >
                  Manually identifying, evaluating and swapping low-value tokens
                  is time consuming. Automate this process, saving your time and
                  effort.
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
                  mt="24px"
                  borderRadius="8px"
                  _hover={{
                    bg: `${COLORS.launchTextColor}`,
                  }}
                >
                  Get Started
                </Button>
              </Flex>

              <Box
              //   mt="10px"
              >
                <Image src="image/Section_left_image.png" alt="left_image" />
              </Box>
            </Box>

            <Box
              h="100%"
              w="40%"
              border={`1px solid ${COLORS.borderColorLanding}`}
              borderRadius="16px"
              py="20px"
              px="20px"
            >
              <Flex flexDir="column">
                <Text color="white" fontWeight={700} lineHeight="17.6px">
                  Token aggregation
                </Text>

                <Text
                  fontWeight={500}
                  fontSize="18px"
                  lineHeight="24.48px"
                  color={COLORS.tabTextColor}
                  mt="16px"
                  maxW="500px"
                  textAlign="left"
                >
                  Aggregate and scoop up those low value assets, as well as
                  assets worth lower than proposed gas fee across your wallet(s)
                  and swap them into ETH.
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
                  mt="24px"
                  borderRadius="8px"
                  _hover={{
                    bg: `${COLORS.launchTextColor}`,
                  }}
                >
                  Get Started
                </Button>
              </Flex>

              <Box mt="10px">
                <Image src="image/Section_right_image.png" alt="left_image" />
              </Box>
            </Box>
          </HStack>
        </Flex>
      </ContainerWrapper>
    </Box>
  );
};

export default SectionOne;
