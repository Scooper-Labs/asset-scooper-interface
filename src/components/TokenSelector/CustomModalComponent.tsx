import {
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

interface ModalComponentProps extends PropsWithChildren<ModalProps> {
  isOpen: boolean;
  confetti?: boolean;
  onClose(): void;
  modalContentStyle?: ModalContentProps;
  modalBodyStyle?: ModalBodyProps;
}

const TokenSelectorModalComponent: FC<ModalComponentProps> = ({
  children,
  isOpen,
  confetti,
  onClose,
  modalContentStyle,
  modalBodyStyle,
  ...props
}): JSX.Element => {
  return (
    <>
      <Modal
        isCentered
        blockScrollOnMount={true}
        isOpen={isOpen}
        size={"sm"}
        onClose={onClose}
        motionPreset="scale"
        {...props}
      >
        <ModalOverlay bg="#00000020" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent
          w={{ base: "90vw", md: "70vw" }}
          borderRadius={10}
          // height="100%"
          {...modalContentStyle}
        >
          <ModalBody padding="0" py="0" px="0" {...modalBodyStyle}>
            <>{children}</>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TokenSelectorModalComponent;
