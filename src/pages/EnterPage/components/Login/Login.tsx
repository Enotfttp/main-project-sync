import {
  StyledBtnEnter,
  StyledContainer,
  StyledCSeparator,
  StyledHeader,
  StyledLoginPage,
  StyledRegistrationText,
  StyledSeparatorText,
} from "./Login.styled";
import { IInitial, validate } from "./Login.utils";
import {
  NotificationItem,
  NotificationItemContent,
} from "@admiral-ds/react-ui";
import { routesPath } from "@app/providers";
import { useLoginMutation } from "@entities/auth/auth.hook";
import { ApiError } from "@shared/api";
import { InputFieldUI } from "@shared/ui";
import { FORM_ERROR } from "final-form";
import React, { FC, ReactNode } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

interface ILoginProps {
  btnRedirect: ReactNode;
}

export const Login: FC<ILoginProps> = ({ btnRedirect }) => {
  const navigate = useNavigate();
  const { mutateAsync } = useLoginMutation();
  const initialState: IInitial = React.useMemo(
    () => ({
      login: "",
      password: "",
    }),
    [],
  );

  const onSubmit = async (values: IInitial) => {
    try {
      await mutateAsync(values);
      navigate(routesPath.packages.root);
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.response?.data?.error || "Произошла ошибка при входе";

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
        {({ submitError, submitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <StyledHeader font="Header/H2">Вход в систему</StyledHeader>
            <StyledContainer>
              {submitError && (
                <NotificationItem status="error" displayStatusIcon>
                  <NotificationItemContent>
                    {submitError}
                  </NotificationItemContent>
                </NotificationItem>
              )}
              <InputFieldUI dimension="m" name="login" label="Логин" />
              <InputFieldUI
                required
                type="password"
                name="password"
                label="Пароль"
              />
              <StyledBtnEnter type="submit" appearance="primary" dimension="l">
                {submitting ? "Входим..." : "Войти"}
              </StyledBtnEnter>
              <StyledCSeparator>
                <StyledSeparatorText font="Body/Body 1 Short">
                  или
                </StyledSeparatorText>
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
