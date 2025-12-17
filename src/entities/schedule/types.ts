export type PaymentScheduleStatus = "CREATED" | "COMPLETED" | "CANCEL";

export const PaymentScheduleStatusText = {
  CREATED: "Активен",
  COMPLETED: "Обработан",
  CANCEL: "Отменён",
};

export interface IPaymentSchedule {
  id: number;
  comcRequestId: number;
  status: PaymentScheduleStatus;
  dataTrfId: string;
  dataName: string;
  dataTrfNumber: string;
  scheduleSourceGuid: string; // UUID
  scheduleCreatedAt: string;
  utilityCurrencyTariff: string;
  utilityAmountFullCur: number;
  utilityPriority: number;
  vatDocumentTypeAmountFullNds?: number | null;
  vatDocumentTypeVatRate?: number | null;
  vatDocumentTypeAmountNdsCur?: number | null;
  processDocProcessCode: string;
  processDocProcessStartDate?: string | null; // date
  processDocProcessEndDate?: string | null; // date
  createdAt: string;
  updatedAt: string;
}
