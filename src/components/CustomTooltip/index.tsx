"use client";

import React, { ReactNode } from "react";
import { Tooltip, Box } from "@chakra-ui/react";

interface CustomTooltipProps {
  label: string;
  children: ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ label, children }) => {
  return (
    <Tooltip
      label={label}
      placement="top"
      border="1px solid #01E3D433"
      color="#674669"
      fontSize="12px"
      borderRadius="8px"
      textAlign="center"
      p="0.5rem"
      bgColor="#FDFDFD"
    >
      <Box> {children}</Box>
    </Tooltip>
  );
};

export default CustomTooltip;
