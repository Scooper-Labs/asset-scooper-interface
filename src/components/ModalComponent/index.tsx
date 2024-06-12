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

const ModalComponent: FC<ModalComponentProps> = ({
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
        <ModalContent
          w={{ base: "90vw", md: "60vw" }}
          borderRadius={10}
          py="1%"
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

export default ModalComponent;
