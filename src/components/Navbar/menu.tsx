import { AnimatePresence, motion } from "framer-motion";
import { MenuProps } from "./type";
import Action from "./appAction";
import { Box, Link as ChakraLink } from "@chakra-ui/react";

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
          top="80%"
          right="-1px"
          width="full"
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
          border="1px solid"
          borderColor="gray.200"
        >
          <Box display="flex" flexDirection="column" gap="8">
            {links.map(({ name, href }, index) => (
              <ChakraLink
                key={index}
                href={href}
                target={href.startsWith("http") ? "_blank" : "_self"}
                fontSize="sm"
                color="purple.700"
              >
                {name}
              </ChakraLink>
            ))}
          </Box>
          <Action />
        </Box>
      )}
    </AnimatePresence>
  );
};

export default Menu;
