import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  ButtonGroup,
  HStack,
  Input,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import { GrCircleQuestion } from "react-icons/gr";
import CustomTooltip from "@/components/CustomTooltip";
import { RiListSettingsLine } from "react-icons/ri";
import { useSlippageTolerance } from "@/hooks/settings/slippage/useSlippage";
import { SlippageToleranceStorageKey } from "@/hooks/settings/slippage/utils";
import { useSweepThreshhold } from "@/hooks/settings/useThreshold";
import ModalMobileComponent from "@/components/ModalMobileComponent";

export function SwapSettings() {
  const [activeButton, setActiveButton] = useState<string>("auto");
  const { slippageTolerance, setSlippageTolerance } = useSlippageTolerance(
    SlippageToleranceStorageKey.Sweep
  );
  const { setSweepThreshold, sweepthreshHold } = useSweepThreshhold();
  const [slippageError, setSlippageError] = useState<boolean>(false);

  const {
    isOpen: isOpenMobileModal,
    onOpen: onOpenMobileModal,
    onClose: onCloseMobileModal,
  } = useDisclosure();

  const handleSlippageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Number(value) > 50) {
      setSlippageError(true);
    } else {
      setSlippageTolerance(value);
    }
  };

  const handeThreshholdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSweepThreshold(value);
  };

  return (
    <>
      {/* ----------------------- Sweep Setting UI ------------------------- */}

      {/* ------------------------ Mobile Screen (Modal Style) ---------------------- */}
      <Button
        display={{ base: "flex", md: "none" }}
        fontWeight="500"
        bg={COLORS.btnBGGradient}
        borderRadius={10}
        color={COLORS.tabTextColor}
        shadow="small"
        border="1px solid #B190EB"
        _hover={{
          bg: `${COLORS.btnBGGradient}`,
        }}
        onClick={onOpenMobileModal}
      >
        <RiListSettingsLine color={COLORS.settingIconColor} size="15px" />
      </Button>

      {/* ------------------> The Modal style <--------------------- */}

      <ModalMobileComponent
        closeOnOverlayClick={false}
        isOpen={isOpenMobileModal}
        onClose={onCloseMobileModal}
      >
        <Stack>
          {/* ----------------- Threshold ------------------------ */}
          <Box>
            <HStack marginBottom="7px">
              <Text
                color="#281629"
                fontSize="14px"
                fontWeight={500}
                lineHeight="16.8px"
              >
                Threshold
              </Text>
              <Box>
                <CustomTooltip label="Minimum ETH value of token that can be swept">
                  <GrCircleQuestion color="#C9BCCA" size="13.3px" />
                </CustomTooltip>
              </Box>
            </HStack>

            <Box position="relative">
              <Input
                backgroundColor="#FBFDFE"
                border={`1px solid ${COLORS.borderColor}`}
                borderRadius="12px"
                _focus={{
                  border: `1px solid blue.400`,
                  outline: "none",
                  boxShadow: "none",
                }}
                placeholder="$30"
                textAlign="right"
                onChange={(event) => handeThreshholdChange(event)}
                value={sweepthreshHold}
              />
              <Box
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                left="10px"
                zIndex="100"
              >
                ETH
              </Box>
            </Box>
          </Box>

          {/* ----------------- Maximum Slippage ------------------------ */}
          <Box mt="24px">
            <HStack>
              <Text
                color="#281629"
                fontSize="14px"
                fontWeight={500}
                lineHeight="16.8px"
              >
                Maximum Slippage
              </Text>
              <Box>
                <CustomTooltip label="Maximum percentage change agreed for the swap to fluctuate below">
                  <GrCircleQuestion color="#C9BCCA" size="13.3px" />
                </CustomTooltip>
              </Box>
            </HStack>

            <HStack mt="8px">
              <ButtonGroup
                border={`1px solid ${COLORS.borderColor}`}
                borderRadius="12px"
                background="#FAF6FD"
                p="6px 6.5px 6px 6.5px"
              >
                <Button
                  width="50px"
                  height="27px"
                  fontSize="14px"
                  bg={activeButton === "auto" ? "#E2E8EC" : "transparent"}
                  color={activeButton === "auto" ? "black" : "black"}
                  fontWeight={500}
                  onClick={() => setSlippageTolerance("1")}
                  _hover={{ bg: "#E2E8EC" }}
                >
                  Auto
                </Button>
                <Button
                  width="65px"
                  height="27px"
                  fontSize="14px"
                  bg={activeButton === "custom" ? "#E2E8EC" : "transparent"}
                  color={activeButton === "custom" ? "black" : "black"}
                  fontWeight={500}
                  onClick={() => setActiveButton("custom")}
                  _hover={{ bg: "#E2E8EC" }}
                >
                  Custom
                </Button>
              </ButtonGroup>

              <Box position="relative">
                <Input
                  backgroundColor="#FBFDFE"
                  border={`1px solid ${COLORS.borderColor}`}
                  borderRadius="12px"
                  _focus={{
                    border: `1px solid blue.400`,
                    outline: "none",
                    boxShadow: "none",
                  }}
                  color="#917193"
                  placeholder="0.5%"
                  value={slippageTolerance}
                  onChange={(event) => handleSlippageChange(event)}
                />

                <Box
                  position="absolute"
                  top="50%"
                  transform="translateY(-50%)"
                  right="10px"
                  zIndex="100"
                >
                  %
                </Box>
              </Box>
            </HStack>
          </Box>

          {/* ----------------- Transaction deadline ------------------------ */}
          <Box mt="16px">
            <HStack>
              <Text
                color="#281629"
                fontSize="14px"
                fontWeight={500}
                lineHeight="16.8px"
              >
                Transaction deadline
              </Text>
              <Box>
                <CustomTooltip label="Time taken for swap to complete">
                  <GrCircleQuestion color="#C9BCCA" size="13.3px" />
                </CustomTooltip>
              </Box>
            </HStack>

            <Input
              backgroundColor="#FBFDFE"
              mt="8px"
              border={`1px solid ${COLORS.borderColor}`}
              borderRadius="12px"
              _focus={{
                border: `1px solid blue.400`,
                outline: "none",
                boxShadow: "none",
              }}
              placeholder="5"
              textAlign="right"
            />
          </Box>

          <Button
            mt="25px"
            borderRadius="8px"
            h="40px"
            background={COLORS.btnGradient}
            fontWeight={400}
            color="white"
            _hover={{
              bg: `${COLORS.btnGradient}`,
              color: "white",
            }}
            onClick={onCloseMobileModal}
          >
            Update
          </Button>
        </Stack>
      </ModalMobileComponent>

      {/* ------------------------ Desktop Screen (Popover Style) ---------------------- */}
      <Popover isLazy placement={"top-end"}>
        <PopoverTrigger>
          <Button
            display={{ base: "none", md: "flex" }}
            fontWeight="500"
            bg={COLORS.btnBGGradient}
            borderRadius={10}
            color={COLORS.tabTextColor}
            shadow="small"
            border="1px solid #B190EB"
            _hover={{
              bg: `${COLORS.btnBGGradient}`,
            }}
          >
            <RiListSettingsLine color={COLORS.settingIconColor} size="15px" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          style={{
            background: "#FDFDFD",
            borderRadius: "16px",
            border: `1px solid ${COLORS.borderColor}`,
            boxShadow: "#E9C7EA4D",
          }}
        >
          <PopoverBody>
            <Stack>
              {/* ----------------- Threshold ------------------------ */}
              <Box>
                <HStack marginBottom="7px">
                  <Text
                    color="#281629"
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight="16.8px"
                  >
                    Threshold
                  </Text>
                  <Box>
                    <CustomTooltip label="Minimum ETH value of token that can be swept">
                      <GrCircleQuestion color="#C9BCCA" size="13.3px" />
                    </CustomTooltip>
                  </Box>
                </HStack>

                <Box position="relative">
                  <Input
                    backgroundColor="#FBFDFE"
                    border={`1px solid ${COLORS.borderColor}`}
                    borderRadius="12px"
                    _focus={{
                      border: `1px solid blue.400`,
                      outline: "none",
                      boxShadow: "none",
                    }}
                    placeholder="$30"
                    textAlign="right"
                    onChange={(event) => handeThreshholdChange(event)}
                    value={sweepthreshHold}
                  />
                  <Box
                    position="absolute"
                    top="50%"
                    transform="translateY(-50%)"
                    left="10px"
                    zIndex="100"
                  >
                    ETH
                  </Box>
                </Box>
              </Box>

              {/* ----------------- Maximum Slippage ------------------------ */}
              <Box mt="24px">
                <HStack>
                  <Text
                    color="#281629"
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight="16.8px"
                  >
                    Maximum Slippage
                  </Text>
                  <Box>
                    <CustomTooltip label="Maximum percentage change agreed for the swap to fluctuate below">
                      <GrCircleQuestion color="#C9BCCA" size="13.3px" />
                    </CustomTooltip>
                  </Box>
                </HStack>

                <HStack mt="8px">
                  <ButtonGroup
                    border={`1px solid ${COLORS.borderColor}`}
                    borderRadius="12px"
                    background="#FAF6FD"
                    p="6px 6.5px 6px 6.5px"
                  >
                    <Button
                      width="50px"
                      height="27px"
                      fontSize="14px"
                      bg={activeButton === "auto" ? "#E2E8EC" : "transparent"}
                      color={activeButton === "auto" ? "black" : "black"}
                      fontWeight={500}
                      onClick={() => setSlippageTolerance("1")}
                      _hover={{ bg: "#E2E8EC" }}
                    >
                      Auto
                    </Button>
                    <Button
                      width="65px"
                      height="27px"
                      fontSize="14px"
                      bg={activeButton === "custom" ? "#E2E8EC" : "transparent"}
                      color={activeButton === "custom" ? "black" : "black"}
                      fontWeight={500}
                      onClick={() => setActiveButton("custom")}
                      _hover={{ bg: "#E2E8EC" }}
                    >
                      Custom
                    </Button>
                  </ButtonGroup>

                  <Box position="relative">
                    <Input
                      backgroundColor="#FBFDFE"
                      border={`1px solid ${COLORS.borderColor}`}
                      borderRadius="12px"
                      _focus={{
                        border: `1px solid blue.400`,
                        outline: "none",
                        boxShadow: "none",
                      }}
                      color="#917193"
                      placeholder="0.5%"
                      value={slippageTolerance}
                      onChange={(event) => handleSlippageChange(event)}
                    />

                    <Box
                      position="absolute"
                      top="50%"
                      transform="translateY(-50%)"
                      right="10px"
                      zIndex="100"
                    >
                      %
                    </Box>
                  </Box>
                </HStack>
              </Box>

              {/* ----------------- Transaction deadline ------------------------ */}
              <Box mt="16px">
                <HStack>
                  <Text
                    color="#281629"
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight="16.8px"
                  >
                    Transaction deadline
                  </Text>
                  <Box>
                    <CustomTooltip label="Time taken for swap to complete">
                      <GrCircleQuestion color="#C9BCCA" size="13.3px" />
                    </CustomTooltip>
                  </Box>
                </HStack>

                <Input
                  backgroundColor="#FBFDFE"
                  mt="8px"
                  border={`1px solid ${COLORS.borderColor}`}
                  borderRadius="12px"
                  _focus={{
                    border: `1px solid blue.400`,
                    outline: "none",
                    boxShadow: "none",
                  }}
                  placeholder="5"
                  textAlign="right"
                />
              </Box>

              <Button
                mt="25px"
                borderRadius="8px"
                h="40px"
                background={COLORS.btnGradient}
                fontWeight={400}
                color="white"
                _hover={{
                  bg: `${COLORS.btnGradient}`,
                  color: "white",
                }}
              >
                Update
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
