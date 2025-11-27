export interface IPeriodsList {
  id: string;
  serviceId: string;
  dateBegin: string;
  dateEnd: string;
  datePayBeg: string;
  datePayEnd: string;
  datePayFact: string;
  status: string;
  chargeAmount: number;
  additionalChargeAmount: number;
  amountAccountRequirements: number;
  sumPay: number;
  sumInc: number;
  sumDbp: number;
  paymentBehavior: string;
  paymentPriorities: string;
  orderMeaning: string;
}

/** TODO.FIX Расшириить для большего фильтрования */
export type TFiltersPeriods = {
  [K in keyof IPeriodsList]?: Array<IPeriodsList[K]> | IPeriodsList[K] | null;
};
