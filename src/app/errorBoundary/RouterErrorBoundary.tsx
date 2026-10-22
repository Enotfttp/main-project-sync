import { NotFoundPage } from "./NotFoundPage";
import {
  ErrorContainer,
  ErrorLayout,
  StyledButton,
  StyledButtonBlock,
  StyledErrorDetails,
  StyledSubtitleError,
  StyledTitleError,
} from "./RouterErrorBoundary.styled";
import { Button } from "@admiral-ds/react-ui";
import { routesPath } from "@app/providers/config/routesPath";
import * as React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export const RouterErrorBoundary = ({
  type = "page",
}: {
  type?: "page" | "modal";
}) => {
  const navigate = useNavigate();
  const error = useRouteError() as Error & { status: number };
  if (error?.status === 404) return <NotFoundPage />;

  return (
    <ErrorLayout>
      <ErrorContainer type={type}>
        <StyledTitleError font="Header/HL2">
          Ошибка {error?.status || 500}
        </StyledTitleError>
        <StyledSubtitleError font="Subtitle/Subtitle 3">
          На сервере произошла непредвиденная ошибка. Пожалуйста, подождите -
          ошибка будет исправлена в ближайшее время. Приносим извинения от всей
          команды
        </StyledSubtitleError>

        {error?.status === 500 ? (
          <StyledButtonBlock>
            <Button appearance="secondary" dimension="m">
              Закрыть
            </Button>
            <Button appearance="primary" dimension="m">
              Переотправить запрос
            </Button>
          </StyledButtonBlock>
        ) : (
          <StyledButton
            appearance="secondary"
            dimension="m"
            onClick={() => navigate(routesPath.root)}
          >
            Перейти на главную страницу
          </StyledButton>
        )}

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
