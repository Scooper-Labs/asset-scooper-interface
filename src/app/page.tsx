"use client";

import { Flex, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Flex>
      <Text>Landing Page is here</Text>
      <Button as={Link} href="/sweep">
        Enter Dapp
      </Button>
    </Flex>
  );
}
