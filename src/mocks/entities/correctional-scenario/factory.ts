import { ICorrectionalScenario } from "@entities/correctional-scenario/model/types";
import { packageDb } from "@mocks/entities/package/factory";
import { createCollection, fakeAccountCode, fakeUuid, faker } from "@mocks/lib";

export type TCorrectionalScenarioMock = ICorrectionalScenario & { id: UUID };

export const createCorrectionalScenario = (): TCorrectionalScenarioMock => {
  const pkg = faker.helpers.arrayElement(packageDb.all());

  return {
    id: fakeUuid(),
    packageSubscriptionId: pkg.packageSubscriptionId,
    accountCode: pkg.accountCode,
    accountInfo: {
      iterimAccountCode: fakeAccountCode(),
      accrueAccountCode: fakeAccountCode(),
    },
  };
};

export const correctionalScenarioDb = createCollection(
  "id",
  createCorrectionalScenario,
  30,
);
