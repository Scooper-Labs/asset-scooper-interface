"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Link as ChakraLink,
  Center,
  Divider,
  Text,
  HStack,
  Flex,
} from "@chakra-ui/react";
import Action from "./appAction";
import { NavLink } from "./type";
import Menu from "./menu";
import useScreenSize from "@/hooks/useScreenSize";
import Hamburger from "@/components/hamburger";
import { SCOOPER_SVG } from "@/assets/svg";
import { COLORS } from "@/constants/theme";
import { useRouter } from "next/router";

const LandingHeader = () => {
  const [isTop, setIsTop] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentHash, setCurrentHash] = useState<string>("");
  const { isDesktop, isTablet, isMobile } = useScreenSize();

  let width = "100%";
  if (isDesktop && !isTop) width = "800px";
  if (isDesktop && isTop) width = "97vw";

  const navLinks: NavLink[] = [
    { name: "Home", href: "#home" },
    {
      name: "Features",
      href: "#features",
    },
    { name: "Docs", href: "#docs" },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setIsTop(position < 20);
    };

    window.addEventListener("scroll", handleScroll);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash || "/");
    };

    window.addEventListener("hashchange", handleHashChange);

    // Set the initial hash or default to "/"
    setCurrentHash(window.location.hash || "/");

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position="fixed"
      width="100vw"
      zIndex="40"
      display="flex"
      justifyContent="center"
      alignItems="center"
      pt={3}
      px={4}
    >
      <Flex
        as="div"
        width={{ base: "100%", md: "100%", lg: "430px" }}
        height={{ base: "56px", md: "52px" }}
        border="1px solid white"
        padding={{ base: "12px", md: "10px 12px" }}
        borderRadius="16px"
        backgroundColor="white"
        backdropFilter="blur(3px)"
      >
        <Flex
          as="div"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <HStack>
            <Box>
              <ChakraLink href="#home">
                {SCOOPER_SVG().Scooper_Logo()}
              </ChakraLink>
            </Box>

            <Flex display={{ base: "block", md: "block", lg: "none" }}>
              <Text
                fontSize="13px"
                fontWeight={500}
                color={COLORS.launchTextColor}
              >
                AssetScooper
              </Text>
            </Flex>

            <Center
              height="20px"
              display={{ base: "none", md: "none", lg: "flex" }}
            >
              <Divider orientation="vertical" border="1px solid #020202" />
            </Center>
          </HStack>

          <HStack
            display={{ base: "none", md: "none", lg: "flex" }}
            // minWidth="250px"
          >
            {navLinks.map(({ name, href }, index) => (
              <ChakraLink
                key={index}
                href={href}
                target={href.startsWith("http") ? "_blank" : "_self"}
                px={2}
                py={2}
                fontWeight={currentHash === href ? 600 : 400}
                fontSize="16px"
                color={currentHash === href ? COLORS.balTextColor : "#C9BCCA"}
                style={{ textDecoration: "none" }}
              >
                {name}
              </ChakraLink>
            ))}
          </HStack>

          <HStack>
            <Center
              height="20px"
              display={{ base: "none", md: "none", lg: "flex" }}
            >
              <Divider orientation="vertical" border="1px solid #020202" />
            </Center>

            <Box display={{ base: "block", md: "block" }}>
              <Action />
            </Box>

            <Hamburger isOpen={isMenuOpen} onClick={toggleMenu} />

            <Menu menuOpen={isMenuOpen} links={navLinks} />
          </HStack>
        </Flex>
      </Flex>
      {/* <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: !isTop ? 5 : 0 }}
        transition={{
          duration: 1.2,
          ease: [0.6, 0.01, -0.05, 0.9],
          type: "spring",
          bounce: 0.2,
        }}
        style={{
          // height: !isTop || isMobile || isTablet ? "" : "64px",
          padding: isMobile || isTablet ? "18px 14px 10px" : "18px 18px 10px",
          width: isMobile || isTablet ? "60%" : width,
          backgroundColor:
            !isTop || isMobile || isTablet ? "white" : "#FFFFFF33",
          borderRadius: !isTop || isMobile || isTablet ? "16px" : "0px",
          border: !isTop || isMobile || isTablet ? "1px solid" : "1px solid",
          borderColor: !isTop || isMobile || isTablet ? "#FFFFFF" : "#FFFFFF33",
          backdropFilter:
            !isTop || isMobile || isTablet ? "blur(5px)" : "blur(10px)",
        }}
      >
        <motion.div
          initial={{ width: "97vw" }}
          animate={{ width }}
          transition={{
            duration: 1.2,
            ease: [0.6, 0.01, -0.05, 0.9],
            type: "spring",
            bounce: 0.2,
          }}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            // marginTop: !isTop || isMobile || isTablet ? "0px" : "10px",
          }}
        >
          <HStack justifyContent="space-between">
            {isTop && isDesktop && (
              <ChakraLink href="#home">
                {SCOOPER_SVG().Scooper_Logo()}
              </ChakraLink>
            )}

            {isTop && isDesktop && (
              <Center height="20px">
                <Divider orientation="vertical" border="1px solid #EB65D566" />
              </Center>
            )}

            {(!isTop || isMobile || isTablet) && (
              <ChakraLink href="#home" p={3}>
                {SCOOPER_SVG().Scooper_Logo()}
              </ChakraLink>
            )}

            {(!isTop || isMobile || isTablet) && (
              <Center height="20px">
                <Divider orientation="vertical" border="1px solid #020202" />
              </Center>
            )}

            <HStack display={{ base: "none", md: "flex" }} minWidth="250px">
              {navLinks.map(({ name, href }, index) => (
                <ChakraLink
                  key={index}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                  px={2}
                  py={2}
                  fontWeight={400}
                  fontSize="16px"
                  color={!isTop ? "#C9BCCA" : "#C9BCCA"}
                  style={{ textDecoration: "none" }}
                >
                  {name}
                </ChakraLink>
              ))}
            </HStack>
          </HStack>
          {/* 
          {(!isTop || isMobile || isTablet) && (
            <Center height="20px">
              <Divider orientation="vertical" border="1px solid #020202" />
            </Center>
          )} */}

      {/* <Box display={{ base: "none", md: "block" }}>
            <Action />
          </Box>

          <Hamburger isOpen={isMenuOpen} onClick={toggleMenu} />

          <Menu menuOpen={isMenuOpen} links={navLinks} />
        </motion.div>
      </motion.div> */}
    </Box>
  );
};

export default LandingHeader;
