import { Center, ToastPosition } from "@chakra-ui/react";
import { MdOutlineError } from "react-icons/md";

const CustomErrorToast = (
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
    status: "error",
    duration: duration || 2000,
    isClosable: true,
    position: pos ? pos : "bottom-left",
    render: () => (
      <Center
        // p="40px"
        zIndex={5000}
        color="black"
        py={"20px"}
        px="15px"
        bg="white"
        filter={"drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.06))"}
        boxShadow="0px 2px 8.4px 0px rgba(0, 0, 0, 0.25)"
        borderRadius={"25px"}
      >
        <MdOutlineError
          size="20px"
          color="red"
          style={{ marginRight: "8px" }}
        />{" "}
        {msg}
      </Center>
    ),
  });
};

export default CustomErrorToast;
