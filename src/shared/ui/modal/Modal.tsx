import { ModalHeader } from "./Modal.styled";
import { Loader } from "../loader/Loader";
import type { ModalProps } from "@admiral-ds/react-ui";
import {
  Modal as ModalTemplate,
  ModalButtonPanel,
  ModalContent,
  ModalTitle,
} from "@admiral-ds/react-ui";
import { ErrorBoundary } from "@app/errorBoundary/ErrorBoundary";
import { FC, ReactNode, Suspense, useId } from "react";

interface IModal extends Omit<ModalProps, "children" | "onClose" | "title"> {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}

export const Modal: FC<IModal> = ({
  isOpen,
  onClose,
  title,
  header,
  children,
  actions,
  closeOnEscapeKeyDown = true,
  closeOnOutsideClick = true,
  ...props
}) => {
  const titleId = useId();

  if (!isOpen) return null;

  return (
    <ErrorBoundary onClose={onClose}>
      <ModalTemplate
        {...props}
        closeOnEscapeKeyDown={closeOnEscapeKeyDown}
        closeOnOutsideClick={closeOnOutsideClick}
        onClose={onClose}
        aria-labelledby={title ? titleId : undefined}
      >
        {header && <ModalHeader>{header}</ModalHeader>}
        {title && <ModalTitle id={titleId}>{title}</ModalTitle>}
        <Suspense
          fallback={
            <ModalContent>
              <Loader />
            </ModalContent>
          }
        >
          <ModalContent>{children}</ModalContent>
          {actions && <ModalButtonPanel>{actions}</ModalButtonPanel>}
        </Suspense>
      </ModalTemplate>
    </ErrorBoundary>
  );
};
