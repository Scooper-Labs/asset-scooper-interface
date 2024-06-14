import React from "react";
import { SITE_EMOJI, SITE_INFO } from "@/utils/site";
import { Flex, Box, HStack, Text, Center, Divider } from "@chakra-ui/react";
import { NetworkStatus } from "./NetworkStatus";
import { LinkComponent } from "./LinkComponent";
import ContainerWrapper from "./ContainerWrapper";
import { COLORS } from "@/constants/theme";
import { RiExternalLinkLine } from "react-icons/ri";

export function AppFooter() {
  return (
    <Box bg={COLORS.footerBGColor} w="100%" h="72px" py="10px" mt="50px">
      <ContainerWrapper>
        <Flex
          as="footer"
          position="sticky"
          justify="space-between"
          align="center"
          bg="neutral"
          color="neutral-content"
          p="4"
        >
          <Text fontWeight={500} fontSize="14px" color="#1D282A">
            {SITE_EMOJI} {SITE_INFO}
          </Text>

          <HStack>
            {/* --------------- Blog Link ----------------- */}
            <HStack>
              <Text color="#0E111B" fontSize="14px">
                Blog
              </Text>
              <LinkComponent
                href={`#`}
                // href={`https://github.com/${SOCIAL_GITHUB}`}
              >
                <RiExternalLinkLine />
              </LinkComponent>
            </HStack>

            {/* --------------- About Us Link ----------------- */}
            <HStack>
              <Text color="#0E111B" fontSize="14px">
                About Us
              </Text>
              <LinkComponent
                href={`#`}
                // href={`https://github.com/${SOCIAL_GITHUB}`}
              >
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
