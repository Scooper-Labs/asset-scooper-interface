"use client";

import { useDisclosure } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import TransactionComplete from "./components/modals/Success";
import ErrorOccured from "./components/modals/Error";

enum Types {
  NONE,
  SUCCESS,
  ERROR,
}
interface StateContextProps {
  type: Types;
  message: string;
  Component: React.JSX.Element;
  setType: (type: Types) => void;
  setMessage: (msg: string) => void;
  setComponent: (component: React.JSX.Element) => void;
}

export const StateContext = createContext<StateContextProps>({
  type: Types.NONE,
  message: "",
  Component: <></>,
  setType: () => {},
  setMessage: () => {},
  setComponent: () => {},
});

export function StateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState<Types>(Types.NONE);
  const [message, setMessage] = useState("");
  const [Component, setComponent] = useState(<></>);

  useEffect(() => {
    if (type !== Types.NONE) {
      onOpen();
    }
  }, [type]);

  const MODAL =
    type === Types.SUCCESS ? (
      <TransactionComplete
        isOpen={isOpen}
        onClose={onClose}
        hash={message as `0x${string}`}
        Component={Component}
      />
    ) : (
      <ErrorOccured isOpen={isOpen} onClose={onClose} error={{ message }} />
    );

  return (
    <StateContext.Provider
      value={{
        type,
        message,
        Component,
        setType,
        setMessage,
        setComponent,
      }}
    >
      {MODAL}
      {children}
    </StateContext.Provider>
  );
}
