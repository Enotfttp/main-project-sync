export const EventType = {
  PACKAGE_ACTIVATION: "Подключение ПУ",
  OPTION_ACTIVATION: "Подключение ДО",
  PACKAGE_PROLONGATION: "Пролонгация ПУ",
  OPTION_PROLONGATION: "Пролонгация ДО",
  PACKAGE_CHANGE: "Смена ПУ",
  PACKAGE_MIGRATION: "Миграция ПУ",
  OPTION_MIGRATION: "Миграция ДО",
  PRE_OPTION_ACTIVATION: "ВТБ-Касса",
  PRIORITY_CHANGE: "Смена приоритета",
  SCHEDULE_UPDATE: "Обновление данных",
  DISABLE_PACKAGE: "Отключение ПУ",
  DISABLE_OPTION: "Отключение ДО",
  CANCEL_FEE: "Отмена графика",
} as const;

export type TEventType = keyof typeof EventType;

export const mapEventType = (status: TEventType) => EventType[status];

export const ScheduleStatus = {
  CREATED: "Создан",
  PROCESSED: "В обработке",
  COMPLETED: "Обработан",
  CANCEL: "Отменен",
  ERROR: "В ошибке",
} as const;

export type TScheduleStatus = keyof typeof ScheduleStatus;

export const mapScheduleStatus = (status: TScheduleStatus) =>
  ScheduleStatus[status];

export const ProcessCode = {
  TOCART: "с картотекой",
  DECLINE: "без картотеки",
} as const;

export type TProcessCode = keyof typeof ProcessCode;

export const mapProcessCode = (code: TProcessCode) => ProcessCode[code];

export const PeriodStatus = {
  CREATED: "Создан",
  PAYMENT_PROCESSED: "Отнесено на промежуточный счет",
  INCOME_NDS_PROCESSED: " НДС отнесено на доходы",
  INCOME_PROCESSED: "Отнесено на доходы",
  DEBT_ACCOUNTED: "Учет требований",
  ACCOUNTS_SETTLED: "Урегулирование счетов",
  ADDITIONAL_DEBT_ACCOUNTED: "Доучет требований",
  PAYMENT_REFUNDED: "Выполнен возврат",
  ANNULLED: "Аннулирован",
  CARD_INDEXED: "В картотеке",
  DECLINED: "Оплата не выполнена",
  REVOKED: "Отозван",
  COMPLETED: "Обработан ",
  CANCEL: "Отменен",
  ERROR: "В ошибке",
} as const;

export type TPeriodStatus = keyof typeof PeriodStatus;

export const mapPeriodStatus = (status: TPeriodStatus) => PeriodStatus[status];

export const ResultType = {
  ITERIM_ACCOUNT: "Отнесено на промежуточный счет ",
  BANK_INCOME_ACCOUNT: "Отнесено на доходы",
  ANNULMENT: "Аннулирован",
} as const;

export type TResultType = keyof typeof ResultType;

export const mapResultType = (status: TResultType) => ResultType[status];
