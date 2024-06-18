"use client";
import { useEffect, ReactNode, useRef } from "react";
import { useWindowSize } from "rooks";
import { Text, Center } from "@chakra-ui/react";

import React from "react";

const AppHome = ({ children }: { children: ReactNode }) => {
  const { innerWidth }: any = useWindowSize();

  const widthSizeRef = useRef(1440);

  useEffect(() => {
    widthSizeRef.current = innerWidth;
    // setWidthSize(innerWidth);
  }, [innerWidth]);

  return (
    <main>
      {widthSizeRef.current < 830 ? (
        <div>
          <Center w={"100%"} flexDir="column" py="5%" px="5%">
            <Text fontWeight={600}>Mobile view is coming soon</Text>
            <Text
              fontSize={["14px", "16px", "16px", "18px", "20px"]}
              textAlign="center"
            >
              Please open the page in a web browser.
            </Text>
          </Center>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </main>
  );
};

export default AppHome;
