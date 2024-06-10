import { TokenSelector } from "@/components/TokenSelector";
import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

function SweepWidget() {
  return (
    <Box>
      <Flex justify="end">
        <HStack>
          <Button>Refresh</Button>
          <Button>
            <SettingsIcon />
          </Button>
        </HStack>
      </Flex>

      <Box border="1px solid #E1C9E1">
        <Box>
          <Image
            width={428}
            height={118}
            alt="Swap tokens Art"
            src="/images/ConvertArt.svg"
          />
        </Box>

        <TokenSelector />
      </Box>
    </Box>
  );
}

export default SweepWidget;
