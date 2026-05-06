import { IPayer } from "@entities/payer/types";

export enum EOrderStatus {
  CREATED = "Запрос разобран",
  FORMED = "ПТ сформировано",
  FRM_ERR = "Ошибки при формировании ПТ или ФЛК",
  SENT = "Документ отправлен в оркестратор",
  ACCEPTED = "Документ принят оркестратором",
  REJECTED = "Документ отклонен оркестратором",
  KART = "Документ поставлен в картотеку",
  PROV = "Документ исполнен",
  QUEUE = "Документ в очереди отложенного исполнения",
  REVOKED = "Документ отозван из картотеки или из очереди",
  DELETED = "Документ ликвидирован или сторнирован",
  OVRDUE_DEBT = "По документу выполнен перенос на счета просроченной задолженности",
  INVOICE_CREATED = "Счёт-фактура создана",
  INVOICE_PAYED = "Счёт-фактура оплачена",
  INVOICE_DELETED = "Счёт-фактура удалена/аннулирована",
}

export enum ERequestProcessCode {
  TOCART = "TOCART",
  DECLINE = "DECLINE",
  CREDIT = "CREDIT",
  REFUND = "REFUND",
  TERMINATION = "TERMINATION",
  CANCEL = "CANCEL",
}

export enum EDocType {
  PT_COM = "Платежное требование",
  UNIVERSALDOC = "Мемориальный ордер",
  CREDITDOC = "Банковский ордер",
  NULL_PAYMENT_DOC = "Нулевой контракт",
  NULL_OPERATION_DOC = "Нулевой документ в ненулевом контракте",
}

export enum EDocStatus {
  CREATED = "Документ создан",
  SENT = "Документ отправили",
  DELIVERED = "Документ принят",
  VALIDATION_ERROR = "Ошибка валидации",
  ACCEPTED = "Документ принят оркестратором",
  REJECTED = "Документ отклонен оркестратором",
  COMPLETED = "Обработка документа завершена",
  ANNULLED = "Документ аннулирован",
}

export enum EProcessDoc {
  PKG_PAY_ADVANCE = "Пакет выплачивает аванс",
  PKG_INCOME = "Пакет доход",
  PKG_SETTLEMENT = "Пакет расчёт",
  PKG_REFUND_ADVANCE = "Пакет аванс возмещения",
  PKG_PAY_CHANGE = "Пакет оплата меняется",
  PKG_INCOME_NDS = "Пакет доход определяется",
  ACCRUE = "Пакет начисляется",
  PKG_SETTLE = "Пакет расчет",
}

export enum EEventType {
  PACKAGE_ACTIVATION = "PACKAGE_ACTIVATION",
  OPTION_ACTIVATION = "OPTION_ACTIVATION",
  PACKAGE_PROLONGATION = "PACKAGE_PROLONGATION",
  OPTION_PROLONGATION = "OPTION_PROLONGATION",
  PACKAGE_CHANGE = "PACKAGE_CHANGE",
  PACKAGE_MIGRATION = "PACKAGE_MIGRATION",
  OPTION_MIGRATION = "OPTION_MIGRATION",
  PRE_OPTION_ACTIVATION = "PRE_OPTION_ACTIVATION",
}

export interface IParams {
  iterimAccountCode: string;
  iterimAccountId: string;
  pkgQueueCompleteDate: string; // TIMESTAMPTZ
  accrueAccountId: string;
  accrueAccountCode: string;
  productInstanceId: string;
}
export interface IBank {
  inn: string;
  kpp: string;
  payerName: string;
  mdmCode: string;
  bic: string;
  name: string;
  corrAccount: string;
  branchCode: string;
}

export interface IDocuments {
  id: number;
  parentDocId: string;
  orderStatus: keyof typeof EOrderStatus | null;
  docType: keyof typeof EDocType;
  requestProcessCode: keyof typeof ERequestProcessCode;
  vkus: string;
  payer: IPayer;
  codeTs: string;
  nameTs: string;
  purpose: string;
  vkusPattern: string;
  amountFullCur: number;
  amountCur: number;
  currencyTariff: string;
  vatDocumentVatRate: number;
  vatDocumentAmountNdsCur: number;
  processDocProcessCode: keyof typeof EProcessDoc;
  bank: IBank;
  param: IParams;
  documentDate: string; // DATE;
  documentLabel: string;
  priority: number;
  eventType: keyof typeof EEventType;
  processEndDate: string; // DATE;
  processAccDate: string; // DATE;
  executionDateTime: string; // TIMESTAMPTZ
  inGroupOperation: boolean;
  attemptsCount: number;
  status: keyof typeof EDocStatus;
  createdAt: string; // TIMESTAMPTZ
  updatedAt: string; // TIMESTAMPTZ
}
