export interface IPayer {
  id: number;
  processing_branch_code: string;
  processing_department_code?: string | null;
  account_code: string;
  account_id: string;
  account_branch_code: string;
  account_department_code?: string | null;
  inn: string;
  kpp?: string | null;
  name: string;
  rec_bank_bic: string;
  rec_bank_corr_account: string;
  rec_bank_name?: string | null;
  mdm_code: string;
  created_at: string;
  updated_at: string;
}
