import { IRegisterData } from "@entities/auth";
import { required, emailRegexp } from "@shared/utils";

export type TInitial = IRegisterData;

export const validate = (values: TInitial) => {
  const errors: Partial<TInitial> = {};

  if (!values?.firstname) {
    errors.firstname = required(values?.firstname);
  }

  if (!values?.lastname) {
    errors.lastname = required(values?.lastname);
  }

  if (values?.email && !values?.email.match(emailRegexp)) {
    errors.email = "Неправильно введён email";
  }

  if (!values?.login) {
    errors.login = required(values?.login);
  }

  if (!values?.password) {
    errors.password = required(values?.password);
  }
  if (!values?.confirmPassword) {
    errors.confirmPassword = required(values?.confirmPassword);
  }

  if (
    (values?.password || values?.confirmPassword) &&
    values?.password !== values?.confirmPassword
  ) {
    errors.password = errors.confirmPassword = "Пароли не совпадают";
  }

  return errors;
};
