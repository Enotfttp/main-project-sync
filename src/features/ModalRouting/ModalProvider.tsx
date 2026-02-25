import { ModalContext } from "./ModalContext";
import { ErrorBoundary } from "@app/providers";
import { Modal } from "@shared/ui";
import * as React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface ModalState {
  content: React.ReactNode;
  title: string;
  customWidth?: string;
  isOpen: boolean;
  onClose?: () => void;
  buttons?: React.ReactNode;
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [modalState, setModalState] = React.useState<ModalState>({
    content: null,
    title: "",
    customWidth: "",
    isOpen: false,
  });

  const openModal = (
    content: React.ReactNode,
    title: string = "",
    customWidth?: string,
    buttons?: React.ReactNode,
  ) => {
    setModalState({
      content,
      title,
      customWidth,
      isOpen: true,
      buttons,
    });
  };

  const closeModal = () => {
    const cleanSearchParams = new URLSearchParams();

    setModalState((prev) => ({ ...prev, isOpen: false }));
    // Очищаем контент после анимации закрытия
    setModalState({
      content: null,
      title: "",
      customWidth: undefined,
      isOpen: false,
      buttons: undefined,
    });
    navigate(
      {
        pathname: location.pathname,
        search: cleanSearchParams.toString(),
      },
      { replace: true },
    );
  };

  const renderModal = () => {
    if (!modalState.isOpen || !modalState.content) return null;

    const modalContent = (
      <ErrorBoundary type="modal">{modalState.content}</ErrorBoundary>
    );

    return createPortal(
      <Modal
        isOpen={modalState.isOpen}
        style={{
          width: modalState.customWidth || "100%",
        }}
        setClose={closeModal}
        title={modalState.title}
        children={{
          contentChildren: modalContent,
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
