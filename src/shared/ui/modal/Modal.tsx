import { Loader } from "../loader/Loader";
import type { ModalProps } from "@admiral-ds/react-ui";
import {
  Modal as ModalTemplate,
  ModalButtonPanel,
  ModalContent,
  ModalTitle,
} from "@admiral-ds/react-ui";
import { ReactNode, Suspense } from "react";

interface IModal extends Omit<ModalProps, "children"> {
  isOpen: boolean;
  setClose: (value: boolean) => void;
  title?: string;
  children: {
    contentChildren: ReactNode;
    btnChildren?: ReactNode;
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
          <Suspense
            fallback={
              <ModalContent>
                <Loader />
              </ModalContent>
            }
          >
            <ModalContent>{children.contentChildren}</ModalContent>
            {children.btnChildren && (
              <ModalButtonPanel>{children.btnChildren}</ModalButtonPanel>
            )}
          </Suspense>
        </ModalTemplate>
      )}
    </>
  );
};
