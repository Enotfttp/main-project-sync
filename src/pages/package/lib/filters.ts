import { IPackageFilter, PackageStatus } from "@entities/package/model";
import { IRenderField, TFilterValue } from "@features/dynamic-filters";
import {
  DATE_RANGE_SEPARATOR,
  enumKey,
  parseIsoDate,
  text,
  validateAmount,
  validateCountNum,
  validatePackageName,
  validateReceiptDate,
} from "@shared/lib";

const validateInn = validateCountNum(36, 36);

export const filters: IRenderField[] = [
  {
    id: "packageSubscriptionId",
    name: "packageSubscriptionId",
    type: "number",
    label: "Номер пакета",
    placeholder: "Введите идентификатор графика...",
    validate: validateInn,
  },
  {
    id: "packageName",
    name: "packageName",
    type: "text",
    label: "Наименование пакета",
    placeholder: "Введите наименование пакета...",
    validate: validatePackageName,
  },
  {
    id: "packageStatus",
    name: "packageStatus",
    type: "select",
    label: "Статус пакета",
    placeholder: "Введите статус пакета...",
    options: Object.entries(PackageStatus).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "activationDate",
    name: "activationDate",
    type: "date-range",
    label: "Дата поступления",
    placeholder: "Введите дату поступления...",
    validate: validateReceiptDate,
  },
  {
    id: "deactivationDate",
    name: "deactivationDate",
    type: "date-range",
    label: "Дата отключения",
    placeholder: "Введите дату отключения...",
    validate: validateReceiptDate,
  },
  {
    id: "paymentPeriod",
    name: "paymentPeriod",
    type: "date-range",
    label: "Период оплаты",
    placeholder: "Введите период оплаты...",
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
];

export const toPackageFilter = (
  filters?: TFilterValue,
): IPackageFilter | undefined => {
  if (!filters) return;

  const requestFilter: IPackageFilter = {};
  const packageSubscriptionId = Number(filters.packageSubscriptionId);
  const packageName = text(filters.packageName);
  const packageStatus = enumKey(PackageStatus, filters.packageStatus);
  const activationDate = text(filters.activationDate);
  const deactivationDate = text(filters.deactivationDate);
  const paymentPeriod = text(filters.paymentPeriod);
  const amountFullCur = Number(filters.amountFullCur);

  if (packageSubscriptionId) {
    requestFilter.packageSubscriptionId = packageSubscriptionId;
  }
  if (packageName) requestFilter.packageName = packageName;
  if (packageStatus) requestFilter.packageStatus = packageStatus;
  if (activationDate) {
    const [dateFrom, dateTo] = activationDate.split(DATE_RANGE_SEPARATOR);
    if (parseIsoDate(dateFrom)) requestFilter.activationDateFrom = dateFrom;
    if (parseIsoDate(dateTo)) requestFilter.activationDateTo = dateTo;
  }
  if (deactivationDate) {
    const [dateFrom, dateTo] = deactivationDate.split(DATE_RANGE_SEPARATOR);
    if (parseIsoDate(dateFrom)) requestFilter.deactivationDateFrom = dateFrom;
    if (parseIsoDate(dateTo)) requestFilter.deactivationDateTo = dateTo;
  }

  if (paymentPeriod) {
    const [dateFrom, dateTo] = paymentPeriod.split(DATE_RANGE_SEPARATOR);
    if (parseIsoDate(dateFrom)) requestFilter.paymentPeriodFrom = dateFrom;
    if (parseIsoDate(dateTo)) requestFilter.paymentPeriodTo = dateTo;
  }

  if (amountFullCur) requestFilter.amountFullCur = amountFullCur;

  return requestFilter;
};
