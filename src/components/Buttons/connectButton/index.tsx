import { Button } from "@chakra-ui/react";
import Avatar from "@/assets/svg";
import { truncate } from "@/utils/address";
import { useAccount } from "wagmi";
import { COLORS } from "@/constants/theme";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function ConnectButton({ onOpen }: { onOpen: () => void }) {
  const { address } = useAccount();
  const { open } = useWeb3Modal();

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
      onClick={() => open({ view: "Connect" })}
    >
      Connect Wallet
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
      <button>{truncate(address || "")}</button>
    </span>
  );
}
