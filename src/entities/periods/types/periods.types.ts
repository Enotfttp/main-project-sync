export interface IPeriodsList {
  id: string;
  serviceId: string;
  dateBegin: string;
  dateEnd: string;
  datePayBeg: string;
  datePayEnd: string;
  datePayFact: string;
  status: string;
  chargeAmount: string;
  additionalChargeAmount: string;
  amountAccountRequirements: string;
  sumPay: string;
  sumInc: string;
  sumDbp: string;
  paymentBehavior: string;
  paymentPriorities: string;
  orderMeaning: string;
}

/** TODO.FIX Расшириить для большего фильтрования */
export type TFiltersPeriods = {
  [K in keyof IPeriodsList]?: Array<IPeriodsList[K]> | IPeriodsList[K] | null;
};
