import { useCallback, useEffect } from "react";
import { useAccount, useChainId, useConnect, useSwitchChain } from "wagmi";
import { base } from "viem/chains";

import { Button } from "@chakra-ui/react";
import { reloadIfNeeded } from "@/utils/reload";

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
      //   type="button"
      //   className={
      //     className ??
      //     'inline-flex h-10 flex-grow items-center justify-center gap-2 rounded-3xl bg-white px-4 py-2'
      //   }
      //   buttonContent=
    >
      {buttonContent ?? "Connect"}
    </Button>
  );
}
