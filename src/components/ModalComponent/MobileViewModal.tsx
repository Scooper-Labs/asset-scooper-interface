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

const ModalMobileComponent: FC<ModalComponentProps> = ({
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
        scrollBehavior={"inside"}
        isOpen={isOpen}
        size={"sm"}
        onClose={onClose}
        motionPreset="scale"
        {...props}
      >
        <ModalOverlay bg="#06081A80" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent
          w={{ base: "90vw", md: "60vw" }}
          borderRadius="16px"
          py="1%"
          position="fixed"
          bottom="0"
          mb="40px"
          bg="#FDFDFDCF"
          {...modalContentStyle}
        >
          <ModalBody {...modalBodyStyle}>
            <>{children}</>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalMobileComponent;
