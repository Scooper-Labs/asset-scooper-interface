"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Box, Text, Tooltip, Button } from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";

const MotionButton = motion(Button);

const Action = () => {
  return (
    <Link href="#home" passHref>
      <MotionButton
        as="a"
        h="32px"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.9 }}
        bg={COLORS.btnGradient}
        borderRadius="10px"
        border="1px solid #007BE0"
        color="white"
        boxShadow={COLORS.boxShadowColor}
        _hover={{
          bg: `${COLORS.btnBGGradient}`,
        }}
      >
        <Tooltip hasArrow label="coming soon" bg="red.600">
          <Text fontSize={{ base: "13px", md: "14px" }} fontWeight="500">
            Launch App
          </Text>
        </Tooltip>
      </MotionButton>
    </Link>
  );
};

export default Action;
