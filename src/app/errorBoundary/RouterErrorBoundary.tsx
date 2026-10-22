import { NotFoundPage } from "./NotFoundPage";
import {
  ErrorContainer,
  ErrorLayout,
  StyledButtonBlock,
  StyledErrorDetails,
  StyledSubtitleError,
  StyledTitleError,
} from "./RouterErrorBoundary.styled";
import { Button } from "@admiral-ds/react-ui";
import { routesPath } from "@app/providers/config/routesPath";
import * as React from "react";
import { useNavigate, useRevalidator, useRouteError } from "react-router-dom";

export const RouterErrorBoundary = ({
  type = "page",
}: {
  type?: "page" | "modal";
}) => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const error = useRouteError() as (Error & { status: number }) | undefined;
  const status = error?.status ?? 500;

  const handleClose = () => {
    const hustoryIndex = window.history.state?.idx;

    if (typeof hustoryIndex === "number" && hustoryIndex > 0) {
      navigate(-1);
      return;
    }

    navigate(routesPath.root);
  };

  const handleRetry = () => {
    revalidator.revalidate();
  };

  if (status === 404) return <NotFoundPage />;

  return (
    <ErrorLayout>
      <ErrorContainer type={type}>
        <StyledTitleError font="Header/HL2">
          Ошибка {status || 500}
        </StyledTitleError>
        <StyledSubtitleError font="Subtitle/Subtitle 3">
          На сервере произошла непредвиденная ошибка. Пожалуйста, подождите -
          ошибка будет исправлена в ближайшее время. Приносим извинения от всей
          команды
        </StyledSubtitleError>

        <StyledButtonBlock>
          <Button appearance="secondary" dimension="m" onClick={handleClose}>
            Закрыть
          </Button>
          <Button appearance="primary" dimension="m" onClick={handleRetry}>
            Переотправить запрос
          </Button>
        </StyledButtonBlock>

        {import.meta.env.VITE_APP_STAND === "development" && error && (
          <StyledErrorDetails className="error-details">
            <summary>Детали ошибки (только для разработки)</summary>
            <pre>{error.message}</pre>
          </StyledErrorDetails>
        )}
      </ErrorContainer>
    </ErrorLayout>
  );
};
