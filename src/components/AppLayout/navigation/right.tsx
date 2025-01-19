import NavAction from "./nav-action";
import { INavActions } from "./types";
import { useAccount } from "wagmi";

const Right = ({
  menuOpen,
  toggleMenu,
  actionItems,
  handleModal,
}: {
  menuOpen?: boolean;
  toggleMenu?: () => void;
  actionItems?: INavActions;
  handleModal: (variant: "account" | "wallet" | "network") => void;
}) => {
  const { address } = useAccount();

  return (
    <div>
      {actionItems?.map((item, index) => (
        <NavAction
          key={index}
          onClick={() => handleModal(item.variant)}
          {...item}
        />
      ))}
    </div>
  );
};

export default Right;
