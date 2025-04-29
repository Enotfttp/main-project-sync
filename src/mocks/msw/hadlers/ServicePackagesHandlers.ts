import {HttpResponse, http} from "msw";
import {IServicePackageList} from "@entities/servicePackage";

const mockedServicePackagesList = [
  {
    id:'1',
    idRKO:'1',
    idServiceConnect:'1',
    idServicePackages:'1',
    idServiceOrder:'1',
    idNewServicePackages:'1',
    comStatusPrd:'Пойдёт',
    orderType: 'Пример типа',
    dateReg:'24.05.25',
    dateExec:'24.06.25',
    datePay:'22.06.25',
    idFolderPay:'21',
    ctbCloseRKO:'Хз, что за тип)',
    bankAccount:'001232131231',
    ctbSumComiss:'100',
    curRemainder:'3000'
  },
  {
    id:'2',
    idRKO:'1',
    idServiceConnect:'1',
    idServicePackages:'1',
    idServiceOrder:'1',
    idNewServicePackages:'1',
    comStatusPrd:'Пойдёт',
    orderType: 'Пример типа',
    dateReg:'24.05.25',
    dateExec:'24.06.25',
    datePay:'22.06.25',
    idFolderPay:'21',
    ctbCloseRKO:'Хз, что за тип)',
    bankAccount:'001232131231',
    ctbSumComiss:'100',
    curRemainder:'3000'
  }
]


export const servicePackagesHandlers = [
  http.get(`/api/service-packages/:id`, ()=>{
    return HttpResponse.json<IServicePackageList[]>(mockedServicePackagesList)
  })
]
