import {HttpResponse, http} from "msw";
import {IServicePackagesList} from "@entities/servicePackages";

const mockedServicePackagesList = [
  {
    idRKO:'1',
    idServiceConnect:'1',
    idServicePackages:'1',
    idServiceOrder:'1',
    idNewServicePackages:'1',
    comStatusPrd:'Пойдёт',
    orderType: 'Пример типа',
    dataReg:'24.05.25',
    dataExec:'24.06.25',
    dataPay:'22.06.25',
    idFolderPay:'21',
    ctbCloseRKO:'Хз, что за тип)',
    bankAccount:'001232131231',
    ctbSumComiss:'100',
    curRemainder:'3000'
  }
]


export const servicePackagesHandlers = [
  http.get(`/api/service-connect/$id`, ()=>{
    return HttpResponse.json<IServicePackagesList[]>(mockedServicePackagesList)
  })
]
