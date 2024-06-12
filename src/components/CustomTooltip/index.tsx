import React, { ReactNode } from "react";
import { Tooltip, Box } from "@chakra-ui/react";

interface CustomTooltipProps {
  label: string;
  children: ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ label, children }) => {
  return (
    <Box>
      <Tooltip
        label={label}
        placement="right"
        border="0.4px solid #8140CE"
        color="black"
        fontSize="12px"
        borderRadius="8px"
        textAlign="center"
        p="0.5rem"
        bgColor="white"
      >
        {children}
      </Tooltip>
    </Box>
  );
};

export default CustomTooltip;
