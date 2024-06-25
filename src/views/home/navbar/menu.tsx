import { AnimatePresence, motion } from "framer-motion";
import { MenuProps } from "./type";
import {
  Box,
  Link as ChakraLink,
  Stack,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import { scooperFooterSocialLinks } from "../sections/footer/data";

const Menu = ({ menuOpen, links }: MenuProps) => {
  return (
    <AnimatePresence>
      {menuOpen && (
        <Box
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          position="absolute"
          top="110%"
          // right="0px"
          left="-12px"
          width="107%"
          h="90vh"
          bg="white"
          // px="18px"
          // pb="4"
          pt="8"
          display="flex"
          flexDirection="column"
          gap="8"
          borderRadius="0 0 16px 16px"
          backdropFilter="blur(10px)"
          boxShadow="lg"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="8"
            alignItems="center"
            justifyContent="center"
            flex="1"
          >
            {links.map(({ name, href }, index) => (
              <ChakraLink
                key={index}
                href={href}
                target={href.startsWith("http") ? "_blank" : "_self"}
                fontSize="sm"
                textAlign="center"
                color="#281629"
                style={{
                  textDecoration: "none",
                }}
              >
                {name}
              </ChakraLink>
            ))}
          </Box>

          <Box
            mt="auto"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
          >
            <HStack spacing={1}>
              {scooperFooterSocialLinks.map((link) => (
                <IconButton
                  as="a"
                  href={link.url}
                  aria-label={link.ariaLabel}
                  icon={<link.icon color="black" />}
                  variant="ghost"
                  _hover={{
                    bg: "ghost",
                  }}
                  size="lg"
                  key={link.ariaLabel}
                />
              ))}
            </HStack>
            <Text color="black" fontSize="13px" fontWeight={400} mb="30px">
              BUILT ON BASE
            </Text>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default Menu;
