import { Token } from "@/lib/components/types";
import { Avatar, AvatarGroup, Box, Flex, Text } from "@chakra-ui/react";

export interface ImageProp {
  src: string;
  symbol: string;
  address: string;
}
interface OverlapProps {
  imageArray: ImageProp[];
  count?: number;
}
export default function OverlappingImage({
  imageArray,
  count = 5,
}: OverlapProps) {
  return (
    <AvatarGroup size="sm" max={count}>
      {imageArray.map((image) => (
        <Avatar name={image.symbol} src={image.src} key={image.address} />
      ))}
    </AvatarGroup>
  );
}

export function getImageArray(tokens: Token[]): ImageProp[] {
  return tokens.map((token) => ({
    src: token.logoURI,
    symbol: token.symbol,
    address: token.address,
  }));
}
