import type { ModalProps } from "@admiral-ds/react-ui";
import {
  Modal as ModalTemplate,
  ModalButtonPanel,
  ModalContent,
  ModalTitle,
} from "@admiral-ds/react-ui";
import * as React from "react";

interface IModal extends Omit<ModalProps, "children"> {
  isOpen: boolean;
  setClose: (value: boolean) => void;
  title?: string;
  children: {
    contentChildren: React.ReactNode;
    btnChildren?: React.ReactNode;
  };
}

export const Modal = ({
  isOpen,
  setClose,
  children,
  title,
  ...props
}: IModal) => {
  return (
    <>
      {isOpen && (
        <ModalTemplate
          {...props}
          onClose={() => {
            setClose(false);
          }}
          aria-labelledby="modal-title"
        >
          {title && <ModalTitle id="modal-title">{title}</ModalTitle>}
          <ModalContent>{children.contentChildren}</ModalContent>
          {children?.btnChildren && (
            <ModalButtonPanel>{children.btnChildren}</ModalButtonPanel>
          )}
        </ModalTemplate>
      )}
    </>
  );
};
