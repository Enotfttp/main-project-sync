import {HttpResponse, http} from "msw";
import {IRKOList} from "@entities/rko";

const mockedRKOList = [
  {
    id:'1',
    idRKO:'1',
    typeDoc: 'Пример 1',
    regNum:'1234567890',
    client:'МБАУМ ООО',
    bankAccount:'001232131231',
    idServicePackages:'1234567890',
    curRemainder:'3000'
  },
  {
    id:'2',
    idRKO:'2',
    typeDoc: 'Пример 2',
    regNum:'2222222222',
    client:'МБАУМ ООО',
    bankAccount:'123123123',
    idServicePackages:'0987654321',
    curRemainder:'1000'
  }
]


export const RKOHandlers = [
  http.get('/api/rko-list', ()=>{
    return HttpResponse.json<IRKOList[]>(mockedRKOList)
  })
]
