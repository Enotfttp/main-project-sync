import { ICorrectionalScenario } from "@entities/correctional-scenario/model/types";
import { packageDb } from "@mocks/entities/package/factory";
import {
  createCollection,
  fakeAccountCode,
  fakeIsoDate,
  fakeUuid,
  faker,
} from "@mocks/lib";

export const createCorrectionalScenario = (): ICorrectionalScenario => {
  const pkg = faker.helpers.arrayElement(packageDb.all());

  return {
    accountCode: pkg.details.accountCode,
    iterimAccountId: fakeUuid(),
    iterimAccountCode: fakeAccountCode(),
    accrueAccountId: fakeUuid(),
    accrueAccountCode: fakeAccountCode(),
    updatedAt: fakeIsoDate() as IsoDateTime,
  };
};

export const correctionalScenarioDb = createCollection(
  "accountCode",
  createCorrectionalScenario,
  30,
);
