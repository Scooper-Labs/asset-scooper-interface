"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";

const Action = () => {
  return (
    <Link href="#home" passHref>
      <Box
        as={motion.button}
        px={3}
        py={2}
        justifyContent="center"
        alignItems="center"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.9 }}
        bg={COLORS.btnGradient}
        borderRadius="10px"
        border="1px solid #007BE0"
        color="white"
        boxShadow={COLORS.boxShadowColor}
      >
        <Tooltip hasArrow label="coming soon" bg="red.600">
          <Text fontSize={{ base: "13px", md: "14px" }} fontWeight="500">
            Launch App
          </Text>
        </Tooltip>
      </Box>
    </Link>
  );
};

export default Action;
