import { ContainerWrapperProps } from "@/lib/components/types";
import { Container as ContainerBox } from "@chakra-ui/react";

export default function ContainerWrapper({ children, ...props }: ContainerWrapperProps) {
  return (
    <ContainerBox pos="relative" maxW={["40em", "40em", "48em", "62em", "80em", "80em"]} {...props}>
      {children}
    </ContainerBox>
  );
}
