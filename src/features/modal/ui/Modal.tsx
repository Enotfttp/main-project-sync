import { ErrorBoundary } from "@features/server-error";
import { Modal as SharedModal } from "@shared/ui";
import { ComponentProps, FC } from "react";

type ModalProps = ComponentProps<typeof SharedModal>;

export const Modal: FC<ModalProps> = ({ onClose, ...props }) => (
  <ErrorBoundary onClose={onClose}>
    <SharedModal onClose={onClose} {...props} />
  </ErrorBoundary>
);
