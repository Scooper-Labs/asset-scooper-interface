"use client";

import ErrorOccured from "@/app/app/components/modals/Error";
import TransactionComplete from "@/app/app/components/modals/Success";
import { ETHToReceive } from "@/app/app/components/sweep-widget";
import useSelectToken from "@/hooks/useSelectToken";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";

export enum Types {
  NONE,
  SUCCESS,
  ERROR,
}
type MessageType = {
  title?: string;
  message: string;
};
interface StateContextProps {
  setType: (type: Types) => void;
  setMessage: (msg: string | MessageType) => void;
}

export const StateContext = createContext<StateContextProps>({
  setType: () => {},
  setMessage: () => {},
});

export function StateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tokenList } = useSelectToken();
  const [type, setType] = useState<Types>(Types.NONE);
  const [message, setMessage] = useState<string | MessageType>("");

  useEffect(() => {
    if (type !== Types.NONE) {
      onOpen();
    }
  }, [type]);

  function close() {
    setType(Types.NONE);
    onClose();
  }

  const MODAL =
    type === Types.SUCCESS ? (
      <TransactionComplete
        isOpen={isOpen}
        onClose={close}
        hash={message as string as `0x${string}`}
        Component={<ETHToReceive selectedTokens={tokenList} />}
      />
    ) : (
      <ErrorOccured
        isOpen={isOpen}
        onClose={close}
        error={message as MessageType}
      />
    );

  return (
    <StateContext.Provider
      value={{
        setType,
        setMessage,
      }}
    >
      {MODAL}
      {children}
    </StateContext.Provider>
  );
}
