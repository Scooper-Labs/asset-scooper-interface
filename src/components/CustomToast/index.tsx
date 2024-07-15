import { Center, ToastPosition } from "@chakra-ui/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const CustomToast = (
  toast: any,
  msg: string,
  duration?: number,
  pos?: ToastPosition | undefined
) => {
  //  "top",
  //    "top-right",
  //    "top-left",
  //    "bottom",
  //    "bottom-right",
  //    "bottom-left",
  toast({
    position: pos ? pos : "bottom-right",
    status: "info",
    duration: duration || 2000,
    isClosable: true,
    render: () => (
      <Center
        // p="40px"
        zIndex={5000}
        color="white"
        py={"20px"}
        px="15px"
        bg="black"
        borderRadius={"25px"}
      >
        <IoCheckmarkCircleSharp size="20px" style={{ marginRight: "8px" }} />{" "}
        {msg}
      </Center>
    ),
  });
};

export default CustomToast;
