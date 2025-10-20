import { useRouteError } from 'react-router-dom';
import { T } from '@admiral-ds/react-ui';
import * as React from 'react';
import {
  ErrorContainer, StyledButton, StyledErrorAction, StyledErrorDetails, StyledLink, StyledServiceErrorTriangleSolid,
} from '@app/providers/errorBoundary/RouterErrorBoundary.styled.ts';

export const RouterErrorBoundary = () =>{
  const error = useRouteError() as Error & {status: number};

  return (
    <ErrorContainer>
      <StyledServiceErrorTriangleSolid />
      <T font="Header/H1">Упс! Что-то пошло не так</T>
      <T font="Body/Body 1 Long"> {error?.status === 404
        ? 'Страница не найдена'
        : 'Произошла непредвиденная ошибка'
      }</T>


      <StyledErrorAction>

        <StyledButton
          appearance="primary"
          dimension="m"
        >
          <StyledLink to="/">На главную</StyledLink>
        </StyledButton>

        <StyledButton
          onClick={() => window.location.reload()}
          appearance="tertiary"
          dimension="m"
        >
          Обновить страницу
        </StyledButton>
      </StyledErrorAction>

      {import.meta.env.VITE_APP_STAND === 'development' && error && (
        <StyledErrorDetails className="error-details">
          <summary>Детали ошибки (только для разработки)</summary>
          <pre>{error.message}</pre>
        </StyledErrorDetails>
      )}
    </ErrorContainer>
  );
};

