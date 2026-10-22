import {
  ErrorContainer,
  ErrorLayout,
  StyledButton,
  StyledErrorDetails,
  StyledSubtitleError,
  StyledTitleError,
} from "./RouterErrorBoundary.styled";
import { routesPath } from "../index";
import * as React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error & { status: number };

  const handleGoBack = () => {
    navigate(routesPath.root);
  };

  return (
    <ErrorLayout>
      <ErrorContainer>
        <StyledTitleError font="Header/HL2">Ошибка 404</StyledTitleError>
        <StyledSubtitleError font="Subtitle/Subtitle 3">
          Страница не найдена. Приносим извинения от всей команды. <br />
          Разработчики уже работают над исправлением этой ошибки.
        </StyledSubtitleError>
        <StyledButton
          appearance="secondary"
          dimension="m"
          onClick={handleGoBack}
        >
          Перейти на главную страницу
        </StyledButton>
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
