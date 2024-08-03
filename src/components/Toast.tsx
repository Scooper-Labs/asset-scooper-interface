import { Center, ToastPosition } from "@chakra-ui/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";

const CustomToast = (
  toast: any,
  msg: string,
  duration?: number,
  pos: ToastPosition = "bottom-right",
  errorToast?: boolean
) => {
  toast({
    position: pos ? pos : "bottom-left",
    status: errorToast ? "error" : "info",
    duration: duration || 2000,
    isClosable: true,
    render: () => (
      <Center
        zIndex={5000}
        color={errorToast ? "black" : "white"}
        py={"20px"}
        px="15px"
        bg={errorToast ? "white" : "black"}
        borderRadius={"25px"}
        filter={
          errorToast ? "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.06))" : ""
        }
        boxShadow={errorToast ? "0px 2px 8.4px 0px rgba(0, 0, 0, 0.25)" : ""}
      >
        {errorToast ? (
          <MdOutlineError
            size="20px"
            color="red"
            style={{ marginRight: "8px" }}
          />
        ) : (
          <IoCheckmarkCircleSharp size="20px" style={{ marginRight: "8px" }} />
        )}
        {msg}
      </Center>
    ),
  });
};

export default CustomToast;
