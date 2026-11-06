/**
 * Метод для нормализации данных из UTC формата
 *
 * @param date Дата в UTC
 * @param withTime флаг от которого зависит какую дату возвращать с временем или нет
 */
export function normalizedDate(date?: IsoDate, withTime?: boolean) {
  if (!date) return "";
  const newDate = new Date(date);

  if (withTime) {
    return newDate.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  }

  return newDate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Разделитель дат внутри значения интервала */
export const DATE_RANGE_SEPARATOR = " - ";

const DATE_MASK = "__.__.____";
const DISPLAY_DATE = /^\d{2}\.\d{2}\.\d{4}$/;

export const splitDateValue = (value: string, isRange?: boolean) =>
  isRange ? value.split(DATE_RANGE_SEPARATOR) : [value];

/**
 * Метод для перевода даты из поля ввода в формат iso yyyy-mm-dd,
 * для интервала - в `yyyy-mm-dd - yyyy-mm-dd`.
 * Для незаполненной до конца даты возвращает null.
 *
 * @param value Дата по маске dd.mm.yyyy
 * @param isRange флаг интервала дат
 */
export const toIsoDateValue = (
  value: string,
  isRange?: boolean,
): string | null => {
  const isoParts = splitDateValue(value, isRange).map((part) => {
    const displayDate = part.trim();
    const [day, month, year] = displayDate.split(".");
    const isoDate = `${year}-${month}-${day}` as IsoDate;

    // Отсекаем незаполненные и несуществующие даты вроде 31.02.2026
    return normalizedDate(isoDate) === displayDate ? isoDate : "";
  });

  if (isoParts.some((part) => !part)) return null;

  return isoParts.join(DATE_RANGE_SEPARATOR);
};

/**
 * Метод для перевода iso даты в значение маски поля ввода
 *
 * @param value Дата в формате yyyy-mm-dd
 * @param isRange флаг интервала дат
 */
export const toDisplayDateValue = (
  value: string,
  isRange?: boolean,
): string => {
  if (!value) return "";

  const displayParts = splitDateValue(value, isRange).map((part) => {
    const displayDate = normalizedDate(part.trim() as IsoDate);

    return DISPLAY_DATE.test(displayDate) ? displayDate : DATE_MASK;
  });

  return displayParts.join(DATE_RANGE_SEPARATOR);
};

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DATE_DIFFERENCE = /^(-?\d+)\s*([dmy])$/i;

/** Календарная дата без времени. `yyyy-mm-dd` читается как локальная, не UTC. */
export const parseIsoDate = (value?: string | null): Date | undefined => {
  const match = value?.trim().match(ISO_DATE);
  if (!match) return;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return;
  }

  return date;
};

export const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

/** Сдвиг на календарные месяцы. 31 января + 1 месяц — 28/29 февраля, не 2–3 марта. */
export const addCalendarMonths = (date: Date, months: number) => {
  const result = new Date(date.getFullYear(), date.getMonth(), 1);
  result.setMonth(result.getMonth() + months);
  const lastDay = new Date(
    result.getFullYear(),
    result.getMonth() + 1,
    0,
  ).getDate();
  result.setDate(Math.min(date.getDate(), lastDay));
  return result;
};

/**
 * Верхняя граница интервала.
 * `dateDifference` — одно значение `1d`, `1m` или `1y`, знак допустим: `-3m`.
 */
export const calculateMaxDate = (
  fromIsoDate: string,
  dateDifference?: string,
): Date | undefined => {
  const fromDate = parseIsoDate(fromIsoDate);
  const difference = dateDifference?.trim().match(DATE_DIFFERENCE);
  if (!fromDate || !difference) return;

  const amount = Number(difference[1]);
  const unit = difference[2].toLowerCase();

  if (unit === "y") return addCalendarMonths(fromDate, amount * 12);
  if (unit === "m") return addCalendarMonths(fromDate, amount);

  const result = new Date(fromDate);
  result.setDate(result.getDate() + amount);
  return result;
};
