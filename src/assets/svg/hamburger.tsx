"use client";

import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

interface IHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const Hamburger: React.FC<IHamburgerProps> = ({ isOpen, onClick }) => {
  return (
    <Box
      display={{ base: "block", md: "block", lg: "none" }}
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      border="1px solid #D5ECFF"
      borderRadius="8px"
      py="5px"
      px="5px"
    >
      <AnimatePresence mode="popLayout">
        {isOpen ? (
          <motion.div
            key="close-icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClick}
          >
            <IoClose />
          </motion.div>
        ) : (
          <motion.div
            key="hamburger-icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClick}
          >
            <RxHamburgerMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Hamburger;
