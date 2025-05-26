export interface IServiceConnectionList {
  id: string;
  idRKO: string;
  idServiceContract: string;
  idSrvPackage: string;
  conNumber: string;
  conDate: string;
  srvPackages: string;
  srvOptions: string;
  dateBeg: string;
  dateEnd: string;
  dateClose: string;
}

/** TODO.FIX Расшириить для большего фильтрования */
export type TFiltersServiceConnection = {
  [K in keyof IServiceConnectionList]?: Array<IServiceConnectionList[K]> | IServiceConnectionList[K] | null;
};
