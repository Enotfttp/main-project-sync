import { IAccountInfo } from "@entities/correctional-scenario/model/types";
import { required } from "@shared/lib";
import { isUuid } from "@shared/ui";

export const ACCOUNT_CODE_LENGTH = 20;

export type TSskUpdateForm = Pick<
  IAccountInfo,
  | "iterimAccountId"
  | "iterimAccountCode"
  | "accrueAccountId"
  | "accrueAccountCode"
>;

export const digitsOnly = (value = "") =>
  value.replace(/\D/g, "").slice(0, ACCOUNT_CODE_LENGTH);

const accountId = (value?: string) =>
  required(value) ||
  (isUuid(value ?? "") ? undefined : "Недопустимый формат идентификатора");

export const validateSskSearch = (values: { accountCode?: string }) => ({
  accountCode: required(values.accountCode),
});

export const validateSskUpdate = (values: TSskUpdateForm) => ({
  iterimAccountId: accountId(values.iterimAccountId),
  iterimAccountCode: required(values.iterimAccountCode),
  accrueAccountId: accountId(values.accrueAccountId),
  accrueAccountCode: required(values.accrueAccountCode),
});
