import React, { ReactNode, FC } from 'react';
import {Form} from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { NotificationItem, NotificationItemContent } from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router-dom';
import {validate, IInitial} from './Login.utils';
import {
  StyledBtnEnter,
  StyledContainer,
  StyledCSeparator,
  StyledHeader,
  StyledLoginPage, StyledRegistrationText, StyledSeparatorText,
} from './Login.styled';
import { InputFieldUI } from '@shared/ui';
import { useLoginMutation } from '@entities/auth';
import { ApiError } from '@shared/api';
import { routesPath } from '@app/providers';

interface ILoginProps {
  btnRedirect: ReactNode
}

export const Login:FC<ILoginProps> = ({btnRedirect}) => {
  const navigate = useNavigate();
  const {mutateAsync} = useLoginMutation();
  const initialState: IInitial = React.useMemo(() => ({
    login: '',
    password: ''
  }), []);

  const onSubmit = async (values: IInitial) => {
    try {
      console.log('test:', import.meta.env);
      await mutateAsync(values);
      navigate(routesPath.root);
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.error || 'Произошла ошибка при входе';

      return { [FORM_ERROR]: errorMessage };
    }
  };

  return (
    <StyledLoginPage>
      <Form<IInitial>
        initialValues={initialState}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({submitError, submitting, handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <StyledHeader font="Header/H2">
              Вход в систему
            </StyledHeader>
            <StyledContainer>
              {submitError && (
                <NotificationItem status="error" displayStatusIcon>
                  <NotificationItemContent>{submitError}</NotificationItemContent>
                </NotificationItem>
              )}
              <InputFieldUI
                dimension="m"
                name="login"
                label="Логин"
              />
              <InputFieldUI
                required
                type="password"
                name="password"
                label="Пароль"
              />
              <StyledBtnEnter type="submit" appearance="primary" dimension="l">
                {submitting ?'Входим...' :'Войти'}
              </StyledBtnEnter>
              <StyledCSeparator>
                <StyledSeparatorText font="Body/Body 1 Short">или</StyledSeparatorText>
              </StyledCSeparator>
              <StyledRegistrationText font="Body/Body 1 Short">
                Ещё нет аккаунта? &nbsp;
                {btnRedirect}
              </StyledRegistrationText>
            </StyledContainer>
          </form>
        )}
      </Form>
    </StyledLoginPage>
  );
};
