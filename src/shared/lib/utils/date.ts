/**
 * Метод для нормализации данных из UTC формата
 *
 * @param date Дата в UTC
 * @param withTime флаг от которого зависит какую дату возвращать с временем или нет
 */
export function normalizedDate(date: IsoDate, withTime?: boolean) {
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

const splitDateValue = (value: string, isRange?: boolean) =>
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

export const calculateMaxDate = (
  fromIsoDate: string,
  dateDifference?: string,
): Date | undefined => {
  const fromDate = new Date(fromIsoDate);
  if (isNaN(fromDate.getTime())) return;

  const resultDate = new Date(fromDate);

  if (dateDifference) {
    // Обработка временных интервалов из конфига
    if (dateDifference.includes("y")) {
      const years = parseInt(dateDifference.split("y")[0]) || 0;
      resultDate.setFullYear(resultDate.getFullYear() + years);
    }
    if (dateDifference.includes("m")) {
      const months = parseInt(dateDifference.split("m")[0]) || 0;
      resultDate.setMonth(resultDate.getMonth() + months);
    }
    if (dateDifference.includes("d")) {
      const days = parseInt(dateDifference.split("d")[0]) || 0;
      resultDate.setDate(resultDate.getDate() + days);
    }
  }

  return resultDate;
};
