import { TValue } from "@features/dynamic-filters";
import {
  addCalendarMonths,
  DATE_RANGE_SEPARATOR,
  parseIsoDate,
  startOfToday,
} from "@shared/lib";

export const required = <T>(value?: T) => {
  if (typeof value !== "number" && !value) {
    return "Данное поле обязательное";
  }
  if (Array.isArray(value) && !value.length) {
    return "Данное поле обязательное";
  }
  return undefined;
};

const THREE_MONTHS_ERROR = "Для вывода доступны данные за три месяца";
const CURRENT_DAY_ERROR = "Для вывода доступны данные не позднее текущего дня";
const PERIOD_ORDER_ERROR = "Окончание периода не может быть раньше его начала";

export const validateReceiptDate = (value: TValue | undefined) => {
  if (typeof value !== "string" || !value) return;

  const [fromIso, toIso] = value.split(DATE_RANGE_SEPARATOR);
  const from = parseIsoDate(fromIso);
  const to = parseIsoDate(toIso);
  if (!from || !to) return;

  if (to < from) return PERIOD_ORDER_ERROR;

  const today = startOfToday();
  const minDate = addCalendarMonths(today, -3);

  if (from < minDate || to < minDate) return THREE_MONTHS_ERROR;
  if (to > today) return CURRENT_DAY_ERROR;
};

export const validateInn = (value: TValue | undefined) => {
  if (!value) return;

  if (Number(value) < 36) {
    return "Допустим ввод не менее 36 символов";
  }

  if (Number(value) < 36) {
    return "Допустим ввод не более 36 символов";
  }
};

export const validateAmount = (value: TValue | undefined) => {
  if (!value || typeof value !== "string") return;
  const [first, second] = value.split(",");

  if (first && first.length > 8) {
    return "Заполните поле, согласно формату 18,2";
  }
  if (second && second.length > 2) {
    return "Заполните поле, согласно формату 18,2";
  }
};
