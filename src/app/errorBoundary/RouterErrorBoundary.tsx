import {
  ErrorContainer,
  StyledButtonBlock,
  StyledErrorDetails,
} from "./RouterErrorBoundary.styled";
import { Button, T } from "@admiral-ds/react-ui";
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

  return (
    <ErrorContainer type={type}>
      <T font="Header/H1">{error?.status || 500}</T>
      <T font="Body/Body 1 Long">
        {error?.status === 404
          ? "Страница не найдена. Приносим извинения от всей команды. Разработчики уже работают над исправлением этой ошибки."
          : "На сервере произошла непредвиденная ошибка. Пожалуйста, подождите - ошибка будет исправлена в ближайшее время. Приносим извинения от всей команды."}
      </T>

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
        <Button
          appearance="secondary"
          dimension="m"
          onClick={() => navigate(routesPath.root)}
        >
          Перейти на главную страницу
        </Button>
      )}

      {import.meta.env.VITE_APP_STAND === "development" && error && (
        <StyledErrorDetails className="error-details">
          <summary>Детали ошибки (только для разработки)</summary>
          <pre>{error.message}</pre>
        </StyledErrorDetails>
      )}
    </ErrorContainer>
  );
};
