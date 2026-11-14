import {
  IAccountInfo,
  ICorrectionalScenario,
} from "@entities/correctional-scenario/model/types";
import { packageDb } from "@mocks/entities/package/factory";
import {
  createCollection,
  fakeAccountCode,
  fakeFutureIsoDate,
  fakeIsoDate,
  fakeUuid,
  faker,
} from "@mocks/lib";

const createAccountInfo = (accountCode: string): IAccountInfo => ({
  accountCode,
  iterimAccountId: "",
  iterimAccountCode: "",
  accrueAccountId: "",
  accrueAccountCode: "",
  iterimAccountIdOld: fakeUuid(),
  iterimAccountCodeOld: fakeAccountCode(),
  accrueAccountIdOld: fakeUuid(),
  accrueAccountCodeOld: fakeAccountCode(),
});

export const createCorrectionalScenario = (
  overrides?: Partial<ICorrectionalScenario>,
): ICorrectionalScenario => {
  const pkg = faker.helpers.arrayElement(packageDb.all());
  const accountCode = overrides?.accountCode ?? pkg.details.accountCode;
  const createdAt = fakeIsoDate();

  return {
    id: overrides?.id ?? fakeUuid(),
    packageSubscriptionId:
      overrides?.packageSubscriptionId ?? pkg.packageSubscriptionId,
    accountCode,
    updatedAt: overrides?.updatedAt ?? fakeFutureIsoDate(createdAt),
    accountInfo: {
      ...createAccountInfo(accountCode),
      ...overrides?.accountInfo,
      accountCode,
    },
  };
};

export const correctionalScenarioDb = createCollection(
  "id",
  () => createCorrectionalScenario(),
  30,
);
