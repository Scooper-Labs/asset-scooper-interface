"use client";

import { Flex, Text, Link, Box, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { nanoid } from "@reduxjs/toolkit";

import { FaXTwitter } from "react-icons/fa6";
import { RiGithubLine } from "react-icons/ri";
import { BiLogoTelegram } from "react-icons/bi";

export const NotFound = () => {
  const socialLinks = [
    {
      href: "https://x.com/assetscooper",
      label: "XTwitter",
      icon: <FaXTwitter color="white" />,
    },
    {
      href: "https://github.com/scooper-labs",
      label: "GitHub",
      icon: <RiGithubLine color="white" />,
    },
    {
      href: "https://t.me/assetscooper",
      label: "Telegram",
      icon: <BiLogoTelegram color="white" />,
    },
  ];

  const { root, home } = useStyles();

  return (
    <Flex {...root} flexDir="column" py="20%" px="5%">
      {/* -------------- For Desktop and Mobile screen -------------- */}
      <Box display={{ base: "none", md: "flex", lg: "flex" }}>
        <Image
          src="/image/404_image.png"
          alt="404-page_image"
          width={600}
          height={600}
        />
      </Box>

      <Box display={{ base: "block", md: "none", lg: "none" }}>
        <Image
          src="/image/404_mobile_image.png"
          alt="404-page_image"
          width={600}
          height={600}
        />
      </Box>

      <Flex
        // position="absolute"
        // mt={{ base: "80px", md: "200px" }}
        flexDir="column"
        textAlign="center"
        justify="center"
        alignItems="center"
        pt={{ base: "100px", md: "120px" }}
      >
        <Text fontSize="18px" fontWeight={500}>
          Something went wrong
        </Text>

        <Text fontWeight={500} fontSize="14px" mt="8px">
          What you are looking for does not currently exist or may have been
          moved
        </Text>

        <Link
          as={Link}
          style={{
            textDecoration: "none",
          }}
          bg="white"
          borderRadius={"8px"}
          color="black"
          cursor="pointer"
          py="10px"
          px="10px"
          mt={{ base: "20px", md: "30px" }}
          border="1px solid #000"
          href="/"
        >
          Take Me Home
        </Link>

        <Flex
          flexDir="column"
          alignItems="center"
          pt={{ base: "60px", md: "20px" }}
        >
          <HStack
            mt={{ base: "16px", md: "24px" }}
            spacing={["20px", "20px", "10px", "10px"]}
          >
            {socialLinks.map((link) => (
              <Box
                as="a"
                key={nanoid()}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                display="flex"
                alignItems="center"
              >
                {link.icon}
              </Box>
            ))}
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NotFound;

const useStyles = () => {
  return {
    root: {
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      bg: "black",
      color: "white",
    },
    home: {
      color: "red",
      fontSize: 40,
      paddingInline: 30,
    },
  };
};
