"use client";

import React from "react";
import { Avatar, Identity, Name, Address } from "@coinbase/onchainkit/identity";
import { ETH_CHAINS } from "@/utils/network";

interface DisplayBasenameProps {
  address: `0x${string}` | undefined;
}

export function Basenames({ address }: DisplayBasenameProps) {
  return (
    <Identity
      address={address}
      //@ts-ignore
      chain={ETH_CHAINS}
      schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
    >
      <Avatar
        address={address}
        //@ts-ignore
        chain={ETH_CHAINS}
      />
      <Name
        address={address}
        //@ts-ignore
        chain={ETH_CHAINS}
      />
      <Address />
    </Identity>
  );
}
