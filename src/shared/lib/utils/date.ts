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

/**
 * Метод для нормализации строковой даты в дату
 *
 * @param dateStr Дата в строке
 */
export const parseStringToDate = (dateStr: string): Date | null => {
  try {
    const [day, month, year] = dateStr.split(".").map(Number);
    if (day && month && year) {
      return new Date(year, month, day);
    }
  } catch {
    return null;
  }
  return null;
};

export const calculateMaxDate = (
  fromDateStr: string,
  dateDifference?: string,
): Date | undefined => {
  const fromDate = parseStringToDate(fromDateStr);
  if (!fromDate) return;

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
