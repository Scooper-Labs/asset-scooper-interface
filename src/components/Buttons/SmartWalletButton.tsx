import { useCallback, useEffect } from "react";
import { useAccount, useChainId, useConnect, useSwitchChain } from "wagmi";
import { base } from "viem/chains";

import { Button } from "@chakra-ui/react";
import { reloadIfNeeded } from "@/utils/reload";
<<<<<<< HEAD
import { COLORS } from "@/constants/theme";
=======
>>>>>>> d8a93a91b2556175dfa3352b58f5baa7a72d5a60

export function CustomConnectButton({
  className,
  buttonContent,
}: {
  className?: string;
  buttonContent?: string;
}) {
  const { connectAsync, connectors } = useConnect();
  const { switchChain } = useSwitchChain();
  const { address, chain } = useAccount();

  useEffect(() => {
    console.log(">> switching chain", chain?.id !== base.id);
    console.log(">> address", address);
    if (address && chain?.id !== base.id) {
      switchChain({ chainId: base.id });
    }
  }, [address]);

  const handleConnect = useCallback(async () => {
    const connector = connectors.find((c) => c.type == "coinbaseWallet");

    if (connector) {
      console.log(">> connecting", connector.type);
      try {
        await connectAsync({ connector });
      } finally {
        reloadIfNeeded();
      }
    }
  }, [connectAsync, connectors]);

  return (
    <Button
      onClick={handleConnect}
<<<<<<< HEAD
      borderRadius="8px"
      color="black"
      fontWeight={400}
      boxShadow="0px 3px 5.8px -2.5px #E443CA66"
      style={{
        background: "#fff",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, .06), 0 2px 3px rgba(0, 0, 0, .06)",
        borderRadius: "8px",
      }}
      //   type="button"
    >
      {buttonContent ?? "Create wallet"}
=======
      //   type="button"
      //   className={
      //     className ??
      //     'inline-flex h-10 flex-grow items-center justify-center gap-2 rounded-3xl bg-white px-4 py-2'
      //   }
      //   buttonContent=
    >
      {buttonContent ?? "Connect"}
>>>>>>> d8a93a91b2556175dfa3352b58f5baa7a72d5a60
    </Button>
  );
}
