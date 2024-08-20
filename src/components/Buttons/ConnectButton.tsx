"use client";

import { Button } from "@chakra-ui/react";
import Avatar from "@/assets/svg";
import { truncateAddress } from "@/utils/walletUtils";
import { useAccount } from "wagmi";
import { COLORS } from "@/constants/theme";
import { IoIosArrowDown } from "react-icons/io";
// import { useWeb3Modal } from "@web3modal/wagmi/react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectButtonRainbow({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const { address } = useAccount();
  // const { open } = useWeb3Modal();

  return address ? (
    <CustomConnectButton onOpen={onOpen} address={address} />
  ) : (
    // <Button
    //   bg={COLORS.btnGradient}
    //   _hover={{
    //     bg: `${COLORS.btnGradient}`,
    //   }}
    //   boxShadow={COLORS.boxShadowColor}
    //   h="40px"
    //   color="white"
    //   fontWeight={400}
    //   borderRadius="8px"
    //   onClick={() => {
    //     console.log("Button clicked!");
    //     open();
    //   }}
    // >
    //   Connect
    // </Button>
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  // <button onClick={openConnectModal} type="button">
                  <Button
                    bg={COLORS.btnGradient}
                    _hover={{
                      bg: `${COLORS.btnGradient}`,
                    }}
                    boxShadow={COLORS.boxShadowColor}
                    h="40px"
                    color="white"
                    fontWeight={400}
                    borderRadius="8px"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect
                  </Button>
                  // </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    bg={COLORS.btnGradient}
                    _hover={{
                      bg: `${COLORS.btnGradient}`,
                    }}
                    boxShadow={COLORS.boxShadowColor}
                    h="40px"
                    color="white"
                    fontWeight={400}
                    borderRadius="8px"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

interface Props {
  onOpen: () => void;
  address: `0x${string}`;
}
function CustomConnectButton({ onOpen, address }: Props) {
  return (
    <span onClick={onOpen} className="customConnectSpan">
      <Avatar />
      <button>
        {truncateAddress(address || "")}
        <IoIosArrowDown size="12px" color="#001423" />
      </button>
    </span>
  );
}
