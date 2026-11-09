import {
  IOptionInfo,
  IOptionInfoDetails,
  OptionStatus,
} from "@entities/option/model";
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
  details: IOptionInfoDetails;
};

const optionStatuses = keysOf(OptionStatus);

export const createOption = (): IOptionMock => {
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
  ...info
}: IOptionMock): IOptionInfo => info;
