import { ReactNode } from "react";
import { ContainerProps, PopoverProps } from "@chakra-ui/react";
import { Address } from "viem";

export interface TabsProps {
  name: string;
  link: string;
}
export interface StoreTabsProps {
  name: string;
  link: string;
}

export interface PopoverComponentProps extends Partial<PopoverProps> {
  label: string;
  children: ReactNode;
}
export interface ContainerWrapperProps extends Partial<ContainerProps> {
  children: ReactNode;
}

export interface DraggableListItem {
  id: string;
  tableName: string;
  desc: string;
}

export interface SvgProps extends Partial<SVGProps<SVGSVGElement>> {
  fillColor?: string | null;
}
export interface ProvidersProps {
  children: ReactNode;
}
export interface TruncatedTextProps {
  text: string;
  maxWords: number;
}

export interface Token {
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
  quoteUSD: number;
  userBalance: number;
}
