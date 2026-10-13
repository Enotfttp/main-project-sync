import { ErrorContainer } from "./RouterErrorBoundary.styled";
import { routesPath } from "../index";
import { Button, T } from "@admiral-ds/react-ui";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(routesPath.root);
  };

  return (
    <ErrorContainer>
      <T font="Header/H1">404</T>
      <T font="Body/Body 1 Long">
        Страница не найдена. Приносим извинения от всей команды. Разработчики
        уже работают над исправлением этой ошибки.
      </T>
      <Button appearance="secondary" dimension="m" onClick={handleGoBack}>
        Перейти на главную страницу
      </Button>
    </ErrorContainer>
  );
};
