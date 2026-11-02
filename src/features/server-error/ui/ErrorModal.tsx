import { ErrorState, IErrorState } from "./ErrorState";
import { Modal } from "@shared/ui";
import { FC } from "react";

export const ErrorModal: FC<IErrorState> = ({
  onClose,
  status = 500,
  ...props
}) => (
  <Modal
    isOpen
    setClose={onClose}
    dimension="l"
    aria-label={`Ошибка ${status}`}
  >
    {{
      contentChildren: (
        <ErrorState status={status} onClose={onClose} {...props} />
      ),
    }}
  </Modal>
);
