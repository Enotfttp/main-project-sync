import * as React from "react";

interface ModalContextType {
  openModal: (
    content: React.ReactNode,
    customWidth?: string,
    title?: string,
    buttons?: React.ReactNode,
  ) => void;
  closeModal: () => void;
}

export const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined,
);

export const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
