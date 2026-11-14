import {
  TDocumentProcessCode,
  TDocumentStatus,
  TDocumentType,
  TOrderStatus,
} from "./status";
import {
  ITableDataPaginationResponse,
  TFilterPaginationRequest,
} from "@shared/types";

export interface IDocumentInfo {
  documentId: UUID;
  documentDate: IsoDate;
  documentType: TDocumentType;
  documentProcessCode: TDocumentProcessCode;
  documentStatus: TDocumentStatus;
  orderStatus: TOrderStatus;
  amountFullCur: number;
  documentMerged: boolean;
  purpose: string;
}

export type TDocumentsPaginationResponse =
  ITableDataPaginationResponse<IDocumentInfo>;

export type TDocumentsRequest = TFilterPaginationRequest<
  object,
  IDocumentInfo
> & {
  periodId?: UUID;
  packageSubscriptionId?: UUID;
  optionSubscriptionId?: UUID;
  mergedDocumentId?: UUID;
};

export interface IDocumentInfoDetails {
  documentId: UUID;
  documentLabel: string;
  documentDate: IsoDate;
  documentType: TDocumentType;
  documentProcessCode: TDocumentProcessCode;
  vkus: string;
  documentStatus: TDocumentStatus;
  orderStatus: TOrderStatus;
  documentMerged: boolean;
  processingBranchCode: string;
  processingDepartmentCode: string;
  payerInfo: IPayerInfo;
  payerBankInfo: IPayerBankInfo;
  beneficiaryInfo?: IBeneficiaryInfo;
  beneficiaryBankInfo?: IBeneficiaryBankInfo;
  currencyOperationInfo?: ICurrencyOperationInfo;
  utilityInfo: IUtilityInfo;
  vatDocument?: IVatDocument;
  additionalCodeInfo?: IAdditionalCodeInfo;
  technicalInfo: ITechnicalInfo;
}

interface IPayerInfo {
  inn: string;
  kpp?: string;
  name: string;
  mdmCode?: string;
  accountId: string;
  accountCode: string;
  currencyAccount?: string;
  accountBranchCode: string;
  accountDepartmentCode?: string;
}

interface IPayerBankInfo {
  bic: string;
  name?: string;
  corrAccount: string;
}

interface IBeneficiaryInfo {
  inn: string;
  kpp?: string;
  name: string;
  mdmCode?: string;
  accountId: UUID;
  accountCode: string;
  currencyAccount?: string;
  accountBranchCode: string;
  accountDepartmentCode?: string;
}

interface IBeneficiaryBankInfo {
  bic: string;
  name?: string;
  corrAccount: string;
}

interface ICurrencyOperationInfo {
  amountFullCur: string;
  currency: string;
  rateType?: string;
  rate: string;
  sumComRub?: string;
  sumNDSRub?: string;
  tbi?: string;
}

interface IUtilityInfo {
  amountFullCur: string;
  amountCur?: string;
  currencyAccount?: string;
  nameTs: string;
  purpose: string;
  codeTs: string;
  vkusPattern: string;
}

interface IVatDocument {
  vatRate: string;
  amountNdsCur: string;
  purposeNds: string;
}

interface IAdditionalCodeInfo {
  accrueAccountId?: string;
  accrueAccountCode?: UUID;
  productInstanceId?: UUID;
  parentDocId?: string;
  pkgQueueCompleteDate?: string;
}

interface ITechnicalInfo {
  createdAt: IsoDate;
  updatedAt: IsoDate;
}
