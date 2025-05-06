import {HttpResponse, http} from "msw";
import {IServiceConnectionList} from "@entities/serviceConnect";

const mockedServiceConnectsList = [
  {
    id:'1',
    idServiceContract:'1',
    idSrvPackage:'1',
    conNumber:'1',
    conDate:'28.04.2025',
    srvPackages:'Название ПУ 1',
    dateBeg:'28.04.2025',
    dateEnd:'28.05.2025',
    dateClose:'28.06.2025',
  },
  {
    id:'2',
    idServiceContract:'2',
    idSrvPackage:'2',
    conNumber:'2',
    conDate:'29.04.2025',
    srvPackages:'Название опции ПУ 1',
    dateBeg:'29.04.2025',
    dateEnd:'29.05.2025',
    dateClose:'29.06.2025',
  },
  {
    id:'3',
    idServiceContract:'3',
    idSrvPackage:'3',
    conNumber:'3',
    conDate:'30.04.2025',
    srvPackages:'Название опции ПУ 2',
    dateBeg:'28.04.2025',
    dateEnd:'28.05.2025',
    dateClose:'28.06.2025',
  },
]


export const serviceConnectsHandlers = [
  http.get(`/api/service-connects/:id`, ()=>{
    return HttpResponse.json<IServiceConnectionList[]>(mockedServiceConnectsList)
  })
]
