"use client";

import React, { useContext, useState } from "react";
import {
  Stack,
  Box,
  Button,
  useDisclosure,
  chakra,
  VStack,
  Flex,
  Text,
  HStack,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import ApprovalModal from "./approval";
import { PARASWAP_TRANSFER_PROXY } from "@/constants/contractAddress";
import {
  useSweepTokens,
  useSweepTokensSimulation,
} from "@/hooks/useAssetScooperWriteContract";
import { Address } from "viem";
import { ETHToReceive } from "@/components/ETHToReceive";
import { useSlippageTolerance } from "@/hooks/settings/slippage/useSlippage";
import { SlippageToleranceStorageKey } from "@/hooks/settings/slippage/utils";
import { useBatchApprovals } from "@/hooks/approvals/useBatchApprovals";
import { useSmartWallet } from "@/hooks/useSmartWallet";
import { useParaSwap } from "@/hooks/swap/useParaswapSwap";
import { IoMdClose } from "react-icons/io";
import ModalComponent from "@/components/ModalComponent/TabViewModal";
import { COLORS } from "@/constants/theme";
import OverlappingImage, { getImageArray } from "../sweep-widget/ImageLap";
import { TokenListProvider } from "@/provider/tokenListProvider";
import { MoralisAssetClass } from "@/utils/classes";
import { ClipLoader } from "react-spinners";
import { SOCIAL_TELEGRAM } from "@/utils/site";
import { TbMessage2Heart } from "react-icons/tb";

interface ConfirmationModalProps {
  tokensAllowanceStatus: boolean;
  refetch: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  tokensAllowanceStatus,
  refetch,
}) => {
  const {
    getTokensWithLiquidity,
    executeBatchSwap,
    loading: paraswapDataLoading,
    isExecuteLoading,
  } = useParaSwap();

  const [tokensWithLiquidity, setTokensWithLiquidity] = React.useState<
    MoralisAssetClass[]
  >([]);
  const [tokensWithoutLiquidity, setTokensWithoutLiquidity] = React.useState<
    MoralisAssetClass[]
  >([]);

  const [previewState, setPreviewState] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { slippageTolerance } = useSlippageTolerance(
    SlippageToleranceStorageKey.Sweep
  );

  const { tokenList: selectedTokens, clearList } =
    useContext(TokenListProvider);
  const { isSmartWallet } = useSmartWallet();

  //Batch approvals for Smart Wallet
  const { approveTTokens, isBatchApprovalLoading } = useBatchApprovals({
    tokens: selectedTokens,
    amounts: selectedTokens.map((item) => item.userBalance.toString()),
    spender: PARASWAP_TRANSFER_PROXY as Address,
  });

  //min-out put for EOA swap, array of bigint 0s
  const minAmountOut = selectedTokens.map((t) => 0n);

  //EOA swap
  // const args = [selectedTokens.map((token) => token.address), minAmountOut];
  const args = [
    tokensWithLiquidity.map((token) => token.address),
    minAmountOut,
  ];

  const { data, resimulate, isPending } = useSweepTokensSimulation(args);
  const { isLoading, isSuccess, sweepTokens } = useSweepTokens(data);

  const handlesweep = async () => {
    const _result = await resimulate();
    await sweepTokens(_result);
    if (isSuccess) {
      clearList();
    }
  };

  const handlePreviewTokens = async () => {
    const { tokensWithLiquidity, tokensWithoutLiquidity } =
      await getTokensWithLiquidity();
    setTokensWithLiquidity(tokensWithLiquidity);
    setTokensWithoutLiquidity(tokensWithoutLiquidity);
    // console.log(
    //   "tokensWithLiquidity",
    //   tokensWithLiquidity,
    //   "tokensWithoutLiquidity",
    //   tokensWithoutLiquidity
    // );
  };

  const isSweeping = isPending || isLoading;
  const isDisabled = !tokensAllowanceStatus || isSweeping;

  return (
    <>
      {/* -------------------- Sweep Button ------------------- */}
      <Button
        width="100%"
        bg={COLORS.btnGradient}
        _hover={{
          bg: `${COLORS.btnGradient}`,
        }}
        boxShadow={COLORS.boxShadowColor}
        color="#fff"
        onClick={() => {
          onOpen();
        }}
      >
        Sweep
      </Button>

      <ModalComponent
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        modalContentStyle={{
          py: "0",
        }}
      >
        {/* ------------------------ Header section ---------------------- */}
        <Flex justify="space-between" alignItems="center">
          <Box flex="1" textAlign="left">
            <Text fontWeight={700} fontSize="14px" color="#0D0D0D">
              Review Transaction
            </Text>
          </Box>

          {/* ------------------- Get help button ---------------- */}
          <HStack>
            <Button
              fontSize="13px"
              fontWeight={400}
              as="a"
              h="40px"
              borderRadius="18px"
              leftIcon={<TbMessage2Heart />}
              _hover={{
                bg: `${COLORS.sweepBGColor}`,
              }}
              href={SOCIAL_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Help
            </Button>

            <IconButton
              aria-label="close-btn"
              icon={<IoMdClose size="24px" color="#0D0D0D" />}
              onClick={onClose}
              bg="none"
              _hover={{
                bg: "none",
              }}
            />
          </HStack>
        </Flex>

        <Stack w="100%">
          {/* ----------------- Token Selected section ---------------- */}
          <Flex flexDir="column">
            <Text
              fontWeight={500}
              fontSize="14px"
              textAlign="start"
              color="#676C87"
              width="100%"
            >
              Sweep
            </Text>

            <HStack mt="15px">
              <OverlappingImage imageArray={getImageArray(selectedTokens)} />
              <Text fontWeight="500" fontSize="14px" color="#2C333B">
                {selectedTokens.length} selected Tokens
              </Text>
            </HStack>
          </Flex>

          {/* ----------------- ETHTOReceive section ---------------- */}
          <VStack alignItems="start" gap="0">
            <Text
              fontWeight={500}
              fontSize="14px"
              textAlign="start"
              color="#676C87"
              width="100%"
            >
              Get
            </Text>
            <Text fontSize="30px">
              {" "}
              <ETHToReceive selectedTokens={selectedTokens} />
            </Text>
          </VStack>

          {/* ----------------- Transaction Details section ---------------- */}
          {previewState ? (
            <>
              {paraswapDataLoading ? (
                <Box
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                >
                  <ClipLoader size={40} color={"#4A90E2"} />
                  <Text
                    textAlign="center"
                    fontSize="13px"
                    color="#676C87"
                    mt={4}
                  >
                    Please wait, trade data is fetching...
                  </Text>
                </Box>
              ) : (
                <VStack>
                  {tokensWithLiquidity.length > 0 && (
                    <>
                      <Text textAlign="center" fontSize="12px" color="#676C87">
                        The following{" "}
                        <>
                          {tokensWithLiquidity.length === 1
                            ? "token"
                            : `tokens`}
                        </>{" "}
                        are sweepable
                      </Text>

                      <VStack>
                        {tokensWithLiquidity.length > 0 && (
                          <>
                            <HStack spacing={-2} alignItems="center">
                              {tokensWithLiquidity.slice(0, 5).map((token) => (
                                <Avatar
                                  key={token.address}
                                  size="sm"
                                  name={token.name}
                                  src={token.logoURI}
                                  border="2px solid white"
                                />
                              ))}
                              {tokensWithLiquidity.length > 5 && (
                                <Text
                                  color="#A8BBD6"
                                  fontSize="13px"
                                  fontWeight={500}
                                >
                                  +{tokensWithLiquidity.length - 5}
                                </Text>
                              )}
                            </HStack>
                          </>
                        )}
                      </VStack>
                    </>
                  )}

                  {tokensWithoutLiquidity &&
                    tokensWithoutLiquidity.length > 0 && (
                      <VStack>
                        <Text
                          textAlign="center"
                          fontSize="12px"
                          color="#676C87"
                        >
                          The following tokens can't be swept because they have
                          insufficient liquidity
                        </Text>
                        {tokensWithoutLiquidity.length > 0 && (
                          <>
                            <HStack spacing={-2} alignItems="center">
                              {tokensWithoutLiquidity
                                .slice(0, 5)
                                .map((token) => (
                                  <Avatar
                                    key={token.address}
                                    size="sm"
                                    name={token.name}
                                    src={token.logoURI}
                                    border="2px solid white"
                                  />
                                ))}
                              {tokensWithoutLiquidity.length > 5 && (
                                <Text
                                  fontSize="13px"
                                  fontWeight="500"
                                  color="#A8BBD6"
                                >
                                  +{tokensWithoutLiquidity.length - 5}{" "}
                                  {tokensWithoutLiquidity.length - 5 === 1
                                    ? "token"
                                    : "tokens"}
                                </Text>
                              )}
                            </HStack>
                          </>
                        )}
                      </VStack>
                    )}

                  {tokensWithLiquidity.length === 0 &&
                    tokensWithoutLiquidity.length === 0 && (
                      <Box>
                        <Text
                          textAlign="center"
                          fontSize="14px"
                          color="#676C87"
                        >
                          Insufficient liquidity for the selected tokens and
                          can't be sweep
                        </Text>
                      </Box>
                    )}
                </VStack>
                // <VStack>
                //   {tokensWithLiquidity.length ? (
                //     <>
                //       <Text textAlign="center" fontSize="14px" color="#676C87">
                //         The following tokens are sweepable
                //       </Text>

                //       <VStack>
                //         {tokensWithLiquidity.map((token) => {
                //           return (
                //             <HStack alignItems="center" key={token.address}>
                //               <Avatar
                //                 size="sm"
                //                 name={token.name}
                //                 src={token.logoURI}
                //               />
                //               <HStack alignItems="center">
                //                 <Text fontWeight="500" color="#281629">
                //                   {token.symbol.length > 6
                //                     ? `${token.symbol.substring(0, 5)}...`
                //                     : token.symbol}
                //                 </Text>
                //                 <Text
                //                   color="#A8BBD6"
                //                   fontSize="13px"
                //                   fontWeight={500}
                //                 >
                //                   {token.name}
                //                 </Text>
                //               </HStack>
                //             </HStack>
                //           );
                //         })}

                //         {tokensWithoutLiquidity && (
                //           <VStack>
                //             <Text
                //               textAlign="center"
                //               fontSize="14px"
                //               color="#676C87"
                //             >
                //               The following tokens can't be sweep, because they
                //               have insufficient liquidity
                //             </Text>
                //             {tokensWithoutLiquidity.map((token) => {
                //               return (
                //                 <HStack key={token.address} alignItems="center">
                //                   <Avatar
                //                     size="sm"
                //                     name={token.name}
                //                     src={token.logoURI}
                //                   />
                //                   <HStack>
                //                     <Text fontWeight="500" color="#281629">
                //                       {token.symbol.length > 6
                //                         ? `${token.symbol.substring(0, 5)}...`
                //                         : token.symbol}
                //                     </Text>
                //                     <Text
                //                       color="#A8BBD6"
                //                       fontSize="13px"
                //                       fontWeight={500}
                //                     >
                //                       {token.name}
                //                     </Text>
                //                   </HStack>
                //                 </HStack>
                //               );
                //             })}
                //           </VStack>
                //         )}
                //       </VStack>
                //     </>
                //   ) : (
                //     <Box>
                //       <Text fontSize="14px" color="#676C87">
                //         Insufficient Liquidity for the selected tokens or trade
                //         will lead to a high price impact
                //       </Text>
                //     </Box>
                //   )}
                // </VStack>
              )}
            </>
          ) : (
            <>
              {" "}
              <VStack
                bg="#F6F9F9"
                width="100%"
                padding="1rem"
                borderRadius="18px"
                fontSize="small"
                mt="10px"
              >
                <Text
                  fontWeight="700"
                  fontSize="14px"
                  color="#281629"
                  width="100%"
                  textAlign="start"
                >
                  Order Details:
                </Text>

                <HStack width="100%" justifyContent="space-between">
                  <Text color="#151829" fontSize="14px" fontWeight={500}>
                    Slippage
                  </Text>
                  <Text color="#674669" fontSize="14px" fontWeight={500}>
                    {slippageTolerance}%
                  </Text>
                </HStack>

                <HStack width="100%" justifyContent="space-between" mt="6px">
                  <Text color="#151829" fontSize="14px" fontWeight={500}>
                    Estimated Transaction Time:
                  </Text>

                  <Flex>
                    <Text color="#674669" fontSize="14px" fontWeight={500}>
                      {3 * selectedTokens.length} seconds
                    </Text>
                  </Flex>
                </HStack>
              </VStack>
              <Text
                mt="10px"
                fontSize="14px"
                color="#676C87"
                fontWeight="500"
                textAlign="center"
              >
                Your transaction is on way to be been processed and{" "}
                <chakra.span color="#151515" fontWeight={600} fontSize="14px">
                  {" "}
                  <ETHToReceive selectedTokens={selectedTokens} />
                </chakra.span>{" "}
                will be deposited to your Wallet.
              </Text>
            </>
          )}

          {/* ----------------- Button section ---------------- */}
          <HStack width="100%" mt="10px" mb="20px">
            {/*  // --------------- Smart wallet Batch Approval --------------- */}
            {isSmartWallet ? (
              <Button
                borderRadius="8px"
                width="100%"
                color="#FDFDFD"
                fontSize="16px"
                fontWeight={500}
                _hover={{
                  bg: tokensAllowanceStatus
                    ? `${COLORS.inputBgcolor}`
                    : `${COLORS.btnGradient}`,
                }}
                bg={
                  tokensAllowanceStatus
                    ? `${COLORS.inputBgcolor}`
                    : `${COLORS.btnGradient}`
                }
                border="1px solid #F6EEFC"
                onClick={() => approveTTokens()}
                isDisabled={isDisabled}
                isLoading={isBatchApprovalLoading}
                loadingText="Approving..."
              >
                Approve All
              </Button>
            ) : (
              // --------------- EOA Approval Modal ---------------
              <ApprovalModal
                tokensAllowanceStatus={tokensAllowanceStatus}
                refetch={refetch}
              />
            )}
            {previewState === true ? (
              <>
                {isSmartWallet ? (
                  <Button
                    width="100%"
                    color="#FDFDFD"
                    fontSize="16px"
                    fontWeight={500}
                    _hover={{
                      bg: tokensAllowanceStatus
                        ? `${COLORS.btnGradient}`
                        : `${COLORS.inputBgcolor}`,
                    }}
                    bg={
                      tokensAllowanceStatus
                        ? `${COLORS.btnGradient}`
                        : `${COLORS.inputBgcolor}`
                    }
                    height="2.5rem"
                    borderRadius="8px"
                    onClick={() => executeBatchSwap()}
                    isDisabled={isDisabled}
                    isLoading={isExecuteLoading}
                    loadingText="Sweeping..."
                  >
                    Sweep
                  </Button>
                ) : (
                  <Button
                    width="100%"
                    color="#FDFDFD"
                    fontSize="16px"
                    fontWeight={400}
                    _hover={{
                      bg: tokensAllowanceStatus
                        ? `${COLORS.btnGradient}`
                        : `${COLORS.inputBgcolor}`,
                    }}
                    bg={
                      tokensAllowanceStatus
                        ? `${COLORS.btnGradient}`
                        : `${COLORS.inputBgcolor}`
                    }
                    height="2.5rem"
                    borderRadius="8px"
                    onClick={handlesweep}
                    isDisabled={isDisabled}
                    isLoading={isSweeping}
                    loadingText="Sweeping..."
                  >
                    Sweep
                  </Button>
                )}
              </>
            ) : (
              <Button
                borderRadius="8px"
                width="100%"
                color="#FDFDFD"
                fontSize="16px"
                fontWeight={500}
                _hover={{
                  bg: tokensAllowanceStatus
                    ? `${COLORS.btnGradient}`
                    : `${COLORS.inputBgcolor}`,
                }}
                bg={
                  tokensAllowanceStatus
                    ? `${COLORS.btnGradient}`
                    : `${COLORS.inputBgcolor}`
                }
                onClick={async () => {
                  setPreviewState(true);
                  await handlePreviewTokens(); //******fetch tokens liquidity status
                }}
              >
                Preview
              </Button>
            )}
          </HStack>
        </Stack>
      </ModalComponent>
    </>
  );
};

export default ConfirmationModal;
