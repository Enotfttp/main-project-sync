export enum EPaymentScheduleStatus {
  CREATED = "Активен",
  COMPLETED = "Обработан",
  CANCEL = "Отменён",
}

export interface IPaymentSchedule {
  id: number;
  comcRequestId: number;
  status: keyof typeof EPaymentScheduleStatus;
  dataTrfId: string;
  dataName: string;
  dataTrfNumber: string;
  scheduleSourceGuid: string; // UUID
  scheduleCreatedAt: string; // TIMESTAMPTZ
  scheduleCancelledAt: string; // TIMESTAMPTZ
  utilityCurrencyTariff: string;
  utilityAmountFullCur: number;
  utilityPriority: number;
  vatDocumentTypeAmountFullNds?: number | null;
  vatDocumentTypeVatRate?: number | null;
  vatDocumentTypeAmountNdsCur?: number | null;
  processDocProcessCode: string;
  processDocProcessStartDate?: string | null; // DATE;
  processDocProcessEndDate?: string | null; // DATE;
  createdAt: string; // TIMESTAMPTZ
  updatedAt: string; // TIMESTAMPTZ
}
