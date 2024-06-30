import Avatar from "@/assets/svg";
import { truncate } from "@/utils/address";
import { useAccount } from "wagmi";

export default function ConnectButton({ onOpen }: { onOpen: () => void }) {
  const { address } = useAccount();

  return address ? (
    <CustomConnectButton onOpen={onOpen} address={address} />
  ) : (
    <w3m-button balance="hide" />
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
