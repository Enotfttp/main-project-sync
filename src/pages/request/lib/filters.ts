import {
  EventType,
  IRequestFilter,
  RequestStatus,
} from "@entities/request/model";
import {
  FilterVariant,
  IRenderField,
  TFilterValue,
} from "@features/dynamic-filters";
import {
  DATE_RANGE_SEPARATOR,
  enumKey,
  parseIsoDate,
  text,
  validateInn,
  validateReceiptDate,
} from "@shared/lib";

const standardFields: IRenderField[] = [
  {
    id: "requestId",
    name: "requestId",
    type: "uuid",
    label: "Идентификатор записи",
    placeholder: "Введите идентификатор записи...",
    validate: validateInn,
  },
  {
    id: "requestStatus",
    name: "requestStatus",
    type: "select",
    label: "Статус запроса",
    placeholder: "Введите статус запроса...",
    options: Object.entries(RequestStatus).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "eventType",
    name: "eventType",
    type: "select",
    label: "Тип события",
    placeholder: "Введите тип события...",
    options: Object.entries(EventType).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "date",
    name: "date",
    type: "date-range",
    label: "Дата поступления",
    placeholder: "Введите дату поступления...",
    validate: validateReceiptDate,
  },
];

const commonFields: IRenderField[] = [
  {
    id: "accountCode",
    name: "accountCode",
    type: "number",
    label: "Номер счёта ССК",
    placeholder: "Введите номер счёта...",
    validate: (value) => {
      if (!value) return;

      if (String(value).length > 20) {
        return "Допустим ввод не более 20 символов";
      }
      if (String(value).length < 20) {
        return "Допустим ввод не менее 20 символов";
      }
    },
  },
  {
    id: "inn",
    name: "inn",
    type: "number",
    label: "ИНН",
    placeholder: "Введите ИНН...",
    validate: (value) => {
      if (!value) return;

      if (String(value).length > 12) {
        return "Допустим ввод не более 12 символов";
      }
      if (String(value).length < 10) {
        return "Допустим ввод не менее 10 символов";
      }
    },
  },
];

export const filterVariants: FilterVariant[] = [
  { label: "Стандартный", fields: standardFields },
  { label: "Общий", fields: commonFields },
];

export const toRequestFilter = (
  filters?: TFilterValue,
): IRequestFilter | undefined => {
  if (!filters) return;

  const requestFilter: IRequestFilter = {};
  const requestId = text(filters.requestId);
  const accountCode = text(filters.accountCode);
  const inn = text(filters.inn);
  const date = text(filters.date);
  const requestStatus = enumKey(RequestStatus, filters.requestStatus);
  const eventType = enumKey(EventType, filters.eventType);

  if (requestId) requestFilter.requestId = requestId;
  if (accountCode) requestFilter.accountCode = accountCode;
  if (inn) requestFilter.inn = inn;
  if (date) {
    const [dateFrom, dateTo] = date.split(DATE_RANGE_SEPARATOR);
    if (parseIsoDate(dateFrom)) requestFilter.dateFrom = dateFrom;
    if (parseIsoDate(dateTo)) requestFilter.dateTo = dateTo;
  }
  if (requestStatus) requestFilter.requestStatus = requestStatus;
  if (eventType) requestFilter.eventType = eventType;

  return requestFilter;
};
