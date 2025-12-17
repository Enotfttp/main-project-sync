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
