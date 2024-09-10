"use client";

import React from "react";
import { Flex, Box, Text, HStack } from "@chakra-ui/react";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import ArrowLeftIcon from "./ArrowIcons/LeftArrow";
import ArrowRightIcon from "./ArrowIcons/RightArrow";
import { motion } from "framer-motion";
import { LinkComponent } from "../LinkComponent";

const slideLeft = {
  x: ["-100%", "0%"],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "linear",
  },
};

const slideRight = {
  x: ["0%", "-100%"],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "linear",
  },
};

const AnnouncementNavbar = () => {
  const arrowsLeft = [1, 2, 3, 4, 5, 6, 7, 8];
  const arrowsRight = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Box
      as="section"
      position="fixed"
      width="100vw"
      zIndex="1000"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        as="div"
        width="100%"
        height="31px"
        p="10px 12px"
        backgroundColor="#006DED"
        justify="center"
        alignItems="center"
      >
        <HStack>
          {/* ----- Arrow Left Icon ------ */}
          <HStack>
            {arrowsLeft.map((arrow, index) => (
              <motion.div
                key={index}
                animate={slideLeft}
                style={{ display: "inline-block", pointerEvents: "none" }}
                transition={{ delay: index * 0.25 }}
              >
                <ArrowLeftIcon />
              </motion.div>
            ))}
          </HStack>
          {/* ----- Arrow Left Icon ------ */}

          <Box borderRadius="24px" backgroundColor="#00E0FF" p="2px 10px">
            <Text color="#006DED" fontSize="12px" fontWeight={500}>
              New
            </Text>
          </Box>

          <HStack>
            <Text color="white" fontSize="12px" fontWeight={400}>
              Assetscooper Integrates coinbase smart wallet{" "}
            </Text>

            <LinkComponent href="/app">
              <Box as="a" pointerEvents="auto">
                <IoArrowForwardCircleSharp color="white" size="16px" />
              </Box>
            </LinkComponent>
          </HStack>

          {/* ----- Arrow Right Icon ------ */}
          <HStack>
            {arrowsRight.map((arrow, index) => (
              <motion.div
                key={index}
                animate={slideRight}
                style={{ display: "inline-block", pointerEvents: "none" }}
                transition={{ delay: index * 0.25 }}
              >
                <ArrowRightIcon />
              </motion.div>
            ))}
          </HStack>
          {/* ----- Arrow Right Icon ------ */}
        </HStack>
      </Flex>
    </Box>
  );
};

export default AnnouncementNavbar;
