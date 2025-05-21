export interface IRKOList {
  id: string;
  idRKO: string;
  typeDoc: string;
  regNum: string;
  client: string;
  bankAccount: string;
  idServicePackages: string;
  curRemainder: string;
}

/**TODO.FIX Расшириить для большего фильтрования */
export type TFiltersRKO = {
  [K in keyof Omit<IRKOList, 'id'>]?: Array<IRKOList[K]> | IRKOList[K] | null;
};
