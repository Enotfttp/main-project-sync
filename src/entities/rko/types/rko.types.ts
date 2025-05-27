export interface IRKOList {
  id: string;
  client: string;
  bankAccount: string;
}

/**TODO.FIX Расшириить для большего фильтрования */
export type TFiltersRKO = {
  [K in keyof Omit<IRKOList, 'id'>]?: Array<IRKOList[K]> | IRKOList[K] | null;
};
