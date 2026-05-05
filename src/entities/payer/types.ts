export interface IPayer {
  id: number;
  processingBranchCode: string;
  processingDepartmentCode?: string | null;
  accountCode: string;
  accountId: string;
  accountBranchCode: string;
  accountDepartmentCode?: string | null;
  inn: string;
  kpp?: string | null;
  name: string;
  recBankBic: string;
  recBankCorrAccount: string;
  recBankName?: string | null;
  mdmCode: string;
  created_at: string; // TIMESTAMPTZ
  updated_at: string; // TIMESTAMPTZ
}
