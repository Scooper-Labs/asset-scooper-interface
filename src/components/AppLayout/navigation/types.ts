interface INavAction {
  text?: string;
  variant: ModalType;
  onClick?: () => void;
}

type INavActions = INavAction[];

// Export all types
export type { INavActions, INavAction };

export type ModalType = "account" | "wallet" | "network";
