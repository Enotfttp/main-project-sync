import { ModalContext } from "./ModalContext";
import { Modal } from "@shared/ui";
import * as React from "react";
import { createPortal } from "react-dom";

interface ModalState {
  content: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose?: () => void;
  buttons?: React.ReactNode;
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = React.useState<ModalState>({
    content: null,
    title: "",
    isOpen: false,
  });

  const openModal = (
    content: React.ReactNode,
    title: string = "",
    buttons?: React.ReactNode,
  ) => {
    setModalState({
      content,
      title,
      isOpen: true,
      buttons,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    // Очищаем контент после анимации закрытия
    setTimeout(() => {
      setModalState({
        content: null,
        title: "",
        isOpen: false,
        buttons: undefined,
      });
    }, 300);
  };

  const renderModal = () => {
    if (!modalState.isOpen || !modalState.content) return null;

    return createPortal(
      <Modal
        isOpen={modalState.isOpen}
        setClose={closeModal}
        title={modalState.title}
        children={{
          contentChildren: modalState.content,
          btnChildren: modalState.buttons,
        }}
      />,
      document.body,
    );
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};
