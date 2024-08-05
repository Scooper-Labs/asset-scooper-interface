import { Button, Flex, Text, HStack, Checkbox } from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import { FaArrowRight } from "react-icons/fa";
import React, { useContext, useMemo } from "react";
import { Token } from "@/lib/components/types";
import { MoralisAssetClass } from "@/utils/classes";
import { TokenListProvider } from "@/provider/tokenListProvider";

export function TokenSelectFooter({
  userWalletTokens,
  onClose,
}: {
  userWalletTokens: MoralisAssetClass[] | undefined;
  onClose: () => void;
}) {
  const {
    selectAll,
    tokenList: selectedTokens,
    clearList,
  } = useContext(TokenListProvider);

  const isAllSelected = (() => {
    if (userWalletTokens) {
      return (
        userWalletTokens.length > 0 &&
        userWalletTokens.length == selectedTokens.length
      );
    }
    return false;
  })();

  const calculateTotalUSDValue = (tokens: Token[]) => {
    return tokens.reduce((total, token) => {
      const tokenUSDValue = token.quoteUSD;
      return total + tokenUSDValue;
    }, 0);
  };
  const totalUSDValue = useMemo(
    () => calculateTotalUSDValue(selectedTokens),
    [selectedTokens]
  );
  return (
    <Flex
      borderRadius={10}
      width="full"
      background="white"
      py="1rem"
      overflow="hidden"
      justify="space-between"
      padding="1rem"
      alignItems="center"
    >
      <Text color="#0099FB" fontSize="larger">
        ~ ${totalUSDValue.toFixed(3)}
      </Text>

      <HStack>
        <Button
          alignContent="center"
          bgColor="#FDFDFD33"
          h="38px"
          border={`1px solid ${
            selectedTokens.length > 0 ? "#0099FB" : "#E7BFE7"
          }`}
          _hover={{
            bgColor: "#E5F2FA",
          }}
          borderRadius={10}
          color={selectedTokens.length > 0 ? "#0099FB" : "#A8BBD6"}
          fontWeight="500"
          onClick={
            isAllSelected
              ? (e) => {
                  e.preventDefault();
                  clearList();
                }
              : (e) => {
                  e.preventDefault();
                  selectAll(userWalletTokens!);
                }
          }
        >
          <Checkbox
            isChecked={isAllSelected}
            sx={{
              "&:hover .chakra-checkbox__control": {
                bg: "blue.500",
              },
              "& .chakra-checkbox__control": {
                border: "2px solid",
                borderColor: "blue.500",
                bg: "gray.100",
                _checked: {
                  bg: "blue.500",
                  borderColor: "blue.500",
                },
              },
            }}
          >
            <Text marginLeft="5px" fontSize="13px">
              Select All
            </Text>
          </Checkbox>
        </Button>
        <Button
          background={
            selectedTokens.length > 0
              ? `${COLORS.selectedTokensBGColor}`
              : "#B5B4C6"
          }
          borderRadius={10}
          onClick={onClose}
        >
          <FaArrowRight size={15} color="white" />
        </Button>
      </HStack>
    </Flex>
  );
}
