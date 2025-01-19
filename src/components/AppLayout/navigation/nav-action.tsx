import { useState, useRef, useEffect } from "react";
import { Box, Flex, Text, Button, useOutsideClick } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { SelectSecondaryIcon } from "../../../../public/icons";
import { networks } from "@/config/switchchain/config";
import { switchChain } from "@wagmi/core";
import { wagmiConfig } from "@/config/switchchain/reownkit";

import useSystemFunctions from "@/hooks/useSystemAppFunctions";

interface NavActionProps {
  text?: string;
  onClick: () => void;
  isMobile?: boolean;
  variant?: "network" | "account" | "wallet";
}

const NavAction = ({ text, onClick, variant = "network" }: NavActionProps) => {
  const { chainId, address } = useAccount();
  const pathname = usePathname();
  const shouldHide = /\/[a-zA-Z]{2}\/sweep$/.test(pathname) || !address;

  const [icon, setIcon] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close the popover when clicking outside
  useOutsideClick({
    //@ts-ignore
    ref: popoverRef,
    handler: () => setIsOpen(false),
  });

  let navigate = useSystemFunctions();

  // Close function to handle popover state
  const close = () => setIsOpen(false);

  /**
   *
   * @description - Take note of the comment inside the
   * handleOnClick function. Especially you want to add more
   * chain in the future (i.e, chainId: id as 8453 | 10 | 1135)
   */

  const handleOnClick = async (network: string, id: number) => {
    if (chainId === id) {
      close();
      return;
    }

    try {
      await switchChain(wagmiConfig, {
        // chain Id for base, optimism, lisk
        chainId: id as 8453 | 10 | 1135,
      });
      //@ts-ignore
      navigate.replace(`/${network.toLowerCase()}/app`);
      close(); // Close the popover after successful switch
    } catch (error) {
      // Handle exceptions that may occur during the switch
      console.error("Error switching chains:", error);
      alert("An error occurred while switching chains.");
    }
  };

  useEffect(() => {
    if (variant === "network" && chainId) {
      const currentNetwork = networks.find(
        (network) => network.chainId === chainId
      );
      if (currentNetwork) setIcon(currentNetwork.icon);
    } else if (variant === "account") {
      setIcon("Account Icon");
    } else if (variant === "wallet") {
      setIcon("Wallet Icon");
    }
  }, [variant, chainId]);

  if (!text && variant !== "network") {
    return null;
  }

  const togglePopover = () => setIsOpen((prev) => !prev);

  return (
    <Box position="relative" display="inline-block">
      <Button
        onClick={() => {
          togglePopover();
          onClick();
        }}
        backgroundColor="#007BE0"
        border="1px solid #007BE0"
        _hover={{
          bg: "#007BE0",
        }}
        borderRadius="8px"
        boxShadow="0px 3px 5.8px -2.5px rgba(228, 67, 202, 0.40)"
        display="flex"
        alignItems="center"
        gap="4px"
        h="40px"
        fontSize="12px"
        padding="5px 10px"
      >
        <Flex border="2px solid #FFFFFF" borderRadius="30px">
          {icon}
        </Flex>
        {variant === "network" && address && (
          <Flex>
            <SelectSecondaryIcon />
          </Flex>
        )}
      </Button>

      {isOpen && (
        <Box
          ref={popoverRef}
          position="absolute"
          top="50px"
          right="0"
          bg="#FDFDFD"
          color="#2C333B"
          border="1px solid rgba(1, 227, 212, 0.2)"
          borderRadius="8px"
          boxShadow="-18.994px 8.997px 31.991px 0px rgba(38, 109, 248, 0.06)"
          zIndex="10"
          width="171px"
          p="4"
        >
          {networks.map(({ icon, title, chainId: id }, index) => (
            <Flex
              key={index}
              alignItems="center"
              justifyContent="space-between"
              p="2"
              cursor="pointer"
              _hover={{
                bg: "gray.100",
                borderRadius: "4px",
                padsing: " 8px 9.5px",
              }}
              onClick={() => handleOnClick(title, id)}
            >
              <Text fontSize="14px" fontWeight="medium" lineHeight="normal">
                {title}
              </Text>

              <Box>{icon}</Box>
              {/* <Box
                w="10px"
                h="10px"
                borderRadius="full"
                bg={chainId === id ? "green.500" : "gray.300"}
              /> */}
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default NavAction;
