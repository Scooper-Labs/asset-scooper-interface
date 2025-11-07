"use client";

import { Button } from "@chakra-ui/react";
import Avatar from "@/assets/svg";
import { truncateAddress } from "@/utils/walletUtils";
import { useAccount } from "wagmi";
import { COLORS } from "@/constants/theme";
import { IoIosArrowDown } from "react-icons/io";
import { useAppKit } from "@reown/appkit/react";

export default function ConnectButtonRainbow({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const { address } = useAccount();
  const { open, close } = useAppKit();

  return address ? (
    <CustomConnectButton onOpen={onOpen} address={address} />
  ) : (
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
      onClick={() => open()}
    >
      Connect
    </Button>
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
