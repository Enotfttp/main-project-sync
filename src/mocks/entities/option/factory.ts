import {
  IOptionInfo,
  IOptionInfoDetails,
  OptionStatus,
} from "@entities/option/model";
import { packageDb } from "@mocks/entities/package/factory";
import {
  createCollection,
  fakeAccountCode,
  fakeAmount,
  fakeFutureIsoDate,
  fakeIsoDate,
  faker,
} from "@mocks/lib";
import { keysOf } from "@shared/lib";

export type IOptionMock = IOptionInfo & {
  packageSubscriptionId: number;
  details: IOptionInfoDetails;
};

const optionStatuses = keysOf(OptionStatus);

export const createOption = (): IOptionMock => {
  const pkg = faker.helpers.arrayElement(packageDb.all());
  const optionSubscriptionId = faker.number.int({
    min: 100_000,
    max: 999_999,
  });
  const optionName = `Опция «${faker.lorem.words(1)}»`;
  const optionStatus = faker.helpers.arrayElement(optionStatuses);
  const activationDate = fakeIsoDate();
  const deactivationDate = fakeFutureIsoDate(activationDate);
  const paymentPeriodFrom = fakeIsoDate();
  const paymentPeriodTo = fakeFutureIsoDate(paymentPeriodFrom);
  const amountFullCur = fakeAmount();
  const createdAt = fakeIsoDate();

  return {
    optionSubscriptionId,
    packageSubscriptionId: pkg.packageSubscriptionId,
    optionName,
    optionStatus,
    activationDate,
    deactivationDate,
    amountFullCur,
    paymentPeriodFrom,
    paymentPeriodTo,
    details: {
      optionSubscriptionId,
      optionName,
      optionStatus,
      activationDate,
      deactivationDate,
      amountFullCur,
      paymentPeriodFrom,
      paymentPeriodTo,
      accountCode: fakeAccountCode(),
      createdAt,
      updatedAt: fakeFutureIsoDate(createdAt),
    },
  };
};

export const optionDb = createCollection(
  "optionSubscriptionId",
  createOption,
  50,
);

export const toOptionInfo = ({
  details: _details,
  packageSubscriptionId: _packageSubscriptionId,
  ...info
}: IOptionMock): IOptionInfo => info;
