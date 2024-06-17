"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";

const Action = () => {
  return (
    <Link href="/sweep" passHref>
      <Box
        as={motion.button}
        px={3}
        py={2}
        mr="35px"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.9 }}
        bg={COLORS.btnGradient}
        borderRadius="8px"
        border="1px solid #007BE0"
        color="white"
        boxShadow={COLORS.boxShadowColor}
      >
        <Text fontSize="sm" fontWeight="500">
          Launch app
        </Text>
      </Box>
    </Link>
  );
};

export default Action;
