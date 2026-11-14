import { ErrorIcon, StatusBody, SuccessIcon } from "./StatusModal.styled";
import { Modal } from "../modal/Modal";
import { Button, Spinner, T } from "@admiral-ds/react-ui";
import { FC } from "react";

export type TStatusPhase = "loading" | "success" | "error";

interface IStatusModalProps {
  phase: TStatusPhase;
  text: string;
  onClose: () => void;
  onRetry?: () => void;
}

export const StatusModal: FC<IStatusModalProps> = ({
  phase,
  text,
  onClose,
  onRetry,
}) => {
  const loading = phase === "loading";

  return (
    <Modal
      isOpen
      dimension="s"
      onClose={onClose}
      displayCloseIcon={!loading}
      closeOnOutsideClick={!loading}
      closeOnEscapeKeyDown={!loading}
      aria-label={text}
      actions={
        phase === "error" ? (
          <>
            {onRetry && (
              <Button
                type="button"
                appearance="primary"
                dimension="m"
                onClick={onRetry}
              >
                Переотправить
              </Button>
            )}
            <Button
              type="button"
              appearance="secondary"
              dimension="m"
              onClick={onClose}
            >
              Закрыть
            </Button>
          </>
        ) : undefined
      }
    >
      <StatusBody>
        {phase === "loading" && <Spinner dimension="l" />}
        {phase === "success" && <SuccessIcon />}
        {phase === "error" && <ErrorIcon />}
        <T font="Body/Body 1 Long">{text}</T>
      </StatusBody>
    </Modal>
  );
};
