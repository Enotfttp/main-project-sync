import {
  EComcRequestStatus,
  EComcResultType,
  EPaymentStatus,
  IContent,
  IRequestHistory,
  TPaymentScheduleStatus,
} from "@entities/history/types";
import { ERequestTypesEventType } from "@entities/requestTypes/types";
import { fakerRU as faker } from "@faker-js/faker";

const eventTypes = Object.keys(ERequestTypesEventType) as Array<
  keyof typeof ERequestTypesEventType
>;

const resultTypes = Object.keys(EComcResultType) as Array<
  keyof typeof EComcResultType
>;

// Базовые данные для всех записей одного запроса
const generateBaseData = (comcRequestId: number) => {
  const createdAt = faker.date.past({ years: 0.3 });
  const requestId = faker.string.uuid();
  const paymentScheduleId = faker.string.uuid();
  const eventType = faker.helpers.arrayElement(eventTypes);
  const eventDateTime = faker.date.future({ years: 0.1, refDate: createdAt });

  return {
    comcRequestId,
    requestId,
    paymentScheduleId,
    eventType,
    eventDateTime: eventDateTime.toISOString(),
    packageSubscriptionId: faker.number.int({ min: 1, max: 100 }),
    createdAt,
    baseContent: {
      message: {
        uuid: faker.string.uuid(),
        timeStamp: createdAt.toISOString(),
      },
      requestId,
      paymentScheduleId,
      eventDateTime: eventDateTime.toISOString(),
      eventType,
    },
  };
};

// Сценарии (каждый comcRequestId - свой сценарий)
export const scenarios = [
  // Сценарий 1: [CREATED]
  {
    comcRequestId: 1,
    statuses: ["CREATED"],
  },
  // Сценарий 2: [CREATED, REJECTED]
  {
    comcRequestId: 2,
    statuses: ["CREATED", "REJECTED"],
  },
  // Сценарий 3: [CREATED, ACCEPTED]
  {
    comcRequestId: 3,
    statuses: ["CREATED", "ACCEPTED"],
  },
  // Сценарий 4: [CREATED, ACCEPTED, ERROR]
  {
    comcRequestId: 4,
    statuses: ["CREATED", "ACCEPTED", "ERROR"],
  },
  // Сценарий 5: [CREATED, ACCEPTED, PROCESSED]
  {
    comcRequestId: 5,
    statuses: ["CREATED", "ACCEPTED", "PROCESSED"],
  },
  // Сценарий 6: [CREATED, ACCEPTED, PROCESSED, ERROR]
  {
    comcRequestId: 6,
    statuses: ["CREATED", "ACCEPTED", "PROCESSED", "ERROR"],
  },
  // Сценарий 7: [CREATED, ACCEPTED, PROCESSED, COMPLETED]
  {
    comcRequestId: 7,
    statuses: ["CREATED", "ACCEPTED", "PROCESSED", "COMPLETED"],
  },
];

// Генерация content для конкретного статуса
const generateContentForStatus = (
  status: keyof typeof EComcRequestStatus,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  baseContent: any,
): IContent => {
  const content: Partial<IContent> = {
    ...baseContent,
    requestStatus: status,
  };

  switch (status) {
    case "CREATED":
      content.paymentScheduleStatus = "FRM_SUCCESS";
      break;

    case "ACCEPTED":
      content.paymentScheduleStatus = "FRM_SUCCESS";
      break;

    case "REJECTED":
      content.paymentScheduleStatus = "FRM_ERR";
      content.error = {
        errorCode: "200",
        errorMessage: "Ошибка валидации: некорректный формат данных",
      };
      break;

    case "PROCESSED":
      content.paymentScheduleStatus =
        faker.helpers.arrayElement<TPaymentScheduleStatus>([
          "PROV",
          "DECLINE",
          "KART",
        ]);

      if (content.paymentScheduleStatus === "PROV") {
        content.result = {
          resultType: faker.helpers.arrayElement(resultTypes),
          payments: [
            {
              periodId: faker.string.uuid(),
              startDate: faker.date
                .recent({ days: 30 })
                .toISOString()
                .split("T")[0],
              endDate: faker.date
                .soon({ days: 30 })
                .toISOString()
                .split("T")[0],
              status: faker.helpers.arrayElement<keyof typeof EPaymentStatus>([
                "ITERIM_ACCOUNT",
                "BANK_INCOME_ACCOUNT",
              ]),
              interimAccountPostDate: faker.date.recent().toISOString(),
              bankIncomeAccountPostDate: faker.date.recent().toISOString(),
            },
          ],
        };
      }
      break;

    case "COMPLETED":
      content.paymentScheduleStatus = "PROV";
      content.result = {
        resultType: "OPERATION_SUCCESS",
        payments: [
          {
            periodId: faker.string.uuid(),
            startDate: faker.date
              .recent({ days: 30 })
              .toISOString()
              .split("T")[0],
            endDate: faker.date.soon({ days: 30 }).toISOString().split("T")[0],
            status: "BANK_INCOME_ACCOUNT",
            interimAccountPostDate: faker.date.recent().toISOString(),
            bankIncomeAccountPostDate: faker.date.recent().toISOString(),
          },
        ],
      };
      break;

    case "ERROR":
      content.paymentScheduleStatus = "ERROR";
      content.error = {
        errorCode: "100",
        errorMessage: "Техническая ошибка обработки: системная ошибка",
      };
      // Если есть result из предыдущего статуса - оставляем
      break;
  }

  // Убедимся, что все обязательные поля есть
  return content as IContent;
};

// Определяем resultType на основе статуса
const getResultTypeForStatus = (
  status: keyof typeof EComcRequestStatus,
): keyof typeof EComcResultType | null => {
  switch (status) {
    case "COMPLETED":
      return "OPERATION_SUCCESS";
    case "REJECTED":
      return "OPERATION_DECLINE";
    case "ERROR":
      return "ANNULMENT";
    default:
      return null;
  }
};

// Генерация всех историй для всех сценариев
export const generateMockHistories = (): IRequestHistory[] => {
  const allHistories: IRequestHistory[] = [];
  let historyId = 10000;

  scenarios.forEach((scenario) => {
    const baseData = generateBaseData(scenario.comcRequestId);

    scenario.statuses.forEach((status, index) => {
      const createdAt = new Date(
        baseData.createdAt.getTime() + index * 3600000,
      );
      const updatedAt = new Date(createdAt.getTime() + 600000);

      const content = generateContentForStatus(
        status as keyof typeof EComcRequestStatus,
        baseData.baseContent,
      );

      allHistories.push({
        id: historyId++,
        comcRequestId: scenario.comcRequestId,
        requestId: baseData.requestId,
        scheduleSourceGuid: faker.string.uuid(),
        packageSubscriptionId: baseData.packageSubscriptionId,
        status: status as keyof typeof EComcRequestStatus,
        resultType: getResultTypeForStatus(
          status as keyof typeof EComcRequestStatus,
        ),
        errorCode: null,
        errorMessage: null,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
        content,
      });
    });
  });

  return allHistories;
};
