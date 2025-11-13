import {
  StyledContainer,
  StyledRegistrationPage,
  StyledHeader,
  StyledBtnEnter,
  StyledCSeparator,
  StyledRegistrationText,
  StyledSeparatorText,
} from "./Registration.styled";
import { validate, TInitial } from "./Registration.utils.ts";
import {
  NotificationItem,
  NotificationItemContent,
  T,
} from "@admiral-ds/react-ui";
import { routesPath } from "@app/providers";
import { useRegisterMutation } from "@entities/auth";
import { StyledTwoBlocks } from "@pages/EnterPage/components/Login/Login.styled.ts";
import { ApiError } from "@shared/api";
import { InputFieldUI } from "@shared/ui";
import { FORM_ERROR } from "final-form";
import React, { ReactNode, FC } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

interface IRegistrationProps {
  btnRedirect: ReactNode;
}

export const Registration: FC<IRegistrationProps> = ({ btnRedirect }) => {
  const navigate = useNavigate();
  const { mutateAsync } = useRegisterMutation();

  const initialState: TInitial = React.useMemo(
    () => ({
      firstname: "",
      lastname: "",
      email: "",
      login: "",
      password: "",
      confirmPassword: "",
    }),
    [],
  );

  const onSubmit = async (values: TInitial) => {
    try {
      const cloneValues = Object.assign({}, values);
      delete cloneValues.confirmPassword;

      await mutateAsync(cloneValues);
      navigate(routesPath.rko.root);
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.response?.data?.error || "Произошла ошибка при регистрации";

      return { [FORM_ERROR]: errorMessage };
    }
  };

  return (
    <StyledRegistrationPage>
      <Form<TInitial>
        initialValues={initialState}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ submitError, submitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <StyledHeader>
              <T font="Header/H2">Создать аккаунт</T>
              <T font="Caption/Caption 1">
                Заполните информацию ниже для регистрации
              </T>
            </StyledHeader>
            <StyledContainer>
              {submitError && (
                <NotificationItem status="error" displayStatusIcon>
                  <NotificationItemContent>
                    {submitError}
                  </NotificationItemContent>
                </NotificationItem>
              )}
              <StyledTwoBlocks>
                <InputFieldUI name="firstname" label="Имя" />
                <InputFieldUI name="lastname" label="Фамилия" />
              </StyledTwoBlocks>
              <InputFieldUI name="email" label="Почта" type="email" />
              <InputFieldUI name="login" label="Логин" />
              <InputFieldUI name="password" label="Пароль" type="password" />
              <InputFieldUI
                name="confirmPassword"
                label="Подтверждение пароля"
                type="password"
              />
              <StyledBtnEnter type="submit" appearance="primary" dimension="l">
                {submitting ? "Регистрация..." : "Зарегистрироваться"}
              </StyledBtnEnter>
              <StyledCSeparator>
                <StyledSeparatorText font="Body/Body 1 Short">
                  или
                </StyledSeparatorText>
              </StyledCSeparator>
              <StyledRegistrationText font="Body/Body 1 Short">
                Уже есть аккаунт? &nbsp;
                {btnRedirect}
              </StyledRegistrationText>
            </StyledContainer>
          </form>
        )}
      </Form>
    </StyledRegistrationPage>
  );
};
