import {
  ErrorStateRoot,
  StyledButtonBlock,
  StyledErrorDetails,
  StyledSubtitleError,
  StyledTitleError,
} from "./ErrorState.styled";
import { Button } from "@admiral-ds/react-ui";
import { FC } from "react";

const SERVER_ERROR_TEXT =
  "На сервере произошла непредвиденная ошибка. Пожалуйста, подождите - ошибка будет исправлена в ближайшее время. Приносим извинения от всей команды";

const getErrorDetails = (error: unknown): string | undefined => {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
};

export interface IErrorState {
  status?: number;
  onClose: () => void;
  onRetry: () => void;
  error?: unknown;
  isRetrying?: boolean;
}

export const ErrorState: FC<IErrorState> = ({
  status = 500,
  onClose,
  onRetry,
  error,
  isRetrying = false,
}) => {
  const details =
    import.meta.env.VITE_APP_STAND === "development"
      ? getErrorDetails(error)
      : undefined;

  return (
    <ErrorStateRoot>
      <StyledTitleError font="Header/HL2">Ошибка {status}</StyledTitleError>
      <StyledSubtitleError font="Subtitle/Subtitle 3">
        {SERVER_ERROR_TEXT}
      </StyledSubtitleError>
      <StyledButtonBlock>
        <Button
          type="button"
          appearance="secondary"
          dimension="m"
          onClick={onClose}
        >
          Закрыть
        </Button>
        <Button
          type="button"
          appearance="primary"
          dimension="m"
          disabled={isRetrying}
          onClick={onRetry}
        >
          Переотправить запрос
        </Button>
      </StyledButtonBlock>
      {details && (
        <StyledErrorDetails>
          <summary>Детали ошибки (только для разработки)</summary>
          <pre>{details}</pre>
        </StyledErrorDetails>
      )}
    </ErrorStateRoot>
  );
};
