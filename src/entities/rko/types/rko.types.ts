export interface IRKOList {
    id:string,
    idRKO:string,
    typeDoc:string,
    regNum:string,
    client:string,
    bankAccount:string,
    idServicePackages:string,
    curRemainder:string
}

/** Расшириить для большего фильтрования */
export type IFiltersRKO = {
    [K in keyof Omit<IRKOList,'id'>]: IRKOList[K] | null
}
