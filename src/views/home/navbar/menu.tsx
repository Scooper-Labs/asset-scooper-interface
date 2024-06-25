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
import { scooperSocialLinks } from "../sections/footer/data";

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
          top="140%"
          right="-1px"
          width="full"
          h="100vh"
          bg="white"
          px="18px"
          pb="4"
          pt="8"
          display="flex"
          flexDirection="column"
          gap="8"
          borderRadius="0 0 8px 8px"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          alignItems="center"
          justifyContent="center"
        >
          <Box display="flex" flexDirection="column" gap="8">
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

            <Stack justifyContent="flex-end" alignItems="center">
              <HStack spacing={1}>
                {scooperSocialLinks.map((link) => (
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

              <Text color="white" fontSize="13px" fontWeight={400}>
                BUILT ON BASE
              </Text>
            </Stack>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default Menu;
