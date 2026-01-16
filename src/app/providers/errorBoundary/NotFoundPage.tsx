import {
  ErrorContainer,
  StyledButton,
  StyledErrorAction,
  StyledLink,
  StyledServiceErrorTriangleSolid,
} from "./RouterErrorBoundary.styled";
import { T } from "@admiral-ds/react-ui";
import { routesPath } from "@app/providers";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Есть куда возвращаться
    } else {
      navigate(routesPath.packages.root); // На главную, если истории нет
    }
  };

  return (
    <ErrorContainer>
      <StyledServiceErrorTriangleSolid />
      <T font="Header/H1">Упс! Что-то пошло не так</T>
      <T font="Body/Body 1 Long">Страница не найдена</T>

      <StyledErrorAction>
        <StyledButton appearance="primary" dimension="m">
          <StyledLink to={routesPath.packages.root}>На главную</StyledLink>
        </StyledButton>
        <StyledButton
          onClick={handleGoBack}
          appearance="tertiary"
          dimension="m"
        >
          Вернуться на предыдущую страницу
        </StyledButton>
      </StyledErrorAction>
    </ErrorContainer>
  );
};
