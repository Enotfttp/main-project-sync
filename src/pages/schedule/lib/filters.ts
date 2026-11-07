import { RequestStatus } from "@entities/request/model";
import { IScheduleFilter, ScheduleStatus } from "@entities/schedule/model";
import { IRenderField, TFilterValue } from "@features/dynamic-filters";
import {
  DATE_RANGE_SEPARATOR,
  enumKey,
  parseIsoDate,
  text,
  validateAmount,
  validateCountNum,
  validateReceiptDate,
} from "@shared/lib";

const validateInn = validateCountNum(36, 36);

export const filters: IRenderField[] = [
  {
    id: "scheduleSourceGuid",
    name: "scheduleSourceGuid",
    type: "uuid",
    label: "Идентификатор графика",
    placeholder: "Введите идентификатор графика...",
    validate: validateInn,
  },
  {
    id: "scheduleStatus",
    name: "scheduleStatus",
    type: "select",
    label: "Статус графика",
    placeholder: "Введите статус графика...",
    options: Object.entries(RequestStatus).map(([key, val]) => ({
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
  {
    id: "amountFullCur",
    name: "amountFullCur",
    type: "number",
    label: "Сумма оплаты",
    placeholder: "Введите сумму оплаты...",
    validate: validateAmount,
  },
  {
    id: "periodPay",
    name: "periodPay",
    type: "date-range",
    label: "Период оплаты",
    placeholder: "Введите период оплаты...",
    validate: validateReceiptDate,
  },
];

export const toScheduleFilter = (
  filters?: TFilterValue,
): IScheduleFilter | undefined => {
  if (!filters) return;

  const requestFilter: IScheduleFilter = {};
  const scheduleSourceGuid = text(filters.scheduleSourceGuid);
  const scheduleStatus = enumKey(ScheduleStatus, filters.scheduleStatus);
  const date = text(filters.date);
  const amountFullCur = Number(filters.amountFullCur);
  const periodPay = text(filters.periodPay);

  if (scheduleSourceGuid) requestFilter.scheduleSourceGuid = scheduleSourceGuid;
  if (scheduleStatus) requestFilter.scheduleStatus = scheduleStatus;
  if (date) {
    const [dateFrom, dateTo] = date.split(DATE_RANGE_SEPARATOR);
    if (parseIsoDate(dateFrom)) requestFilter.dateFrom = dateFrom;
    if (parseIsoDate(dateTo)) requestFilter.dateTo = dateTo;
  }
  if (amountFullCur) requestFilter.amountFullCur = amountFullCur;
  if (periodPay) {
    const [dateFrom, dateTo] = periodPay.split(DATE_RANGE_SEPARATOR);
    if (parseIsoDate(dateFrom)) requestFilter.startDateFrom = dateFrom;
    if (parseIsoDate(dateTo)) requestFilter.endDateTo = dateTo;
  }

  return requestFilter;
};
