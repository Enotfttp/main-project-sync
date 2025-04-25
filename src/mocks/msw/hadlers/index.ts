import {RKOHandlers} from './RKOHandlers.ts'
import {servicePackagesHandlers} from './ServicePackagesHandlers.ts'
import {HttpHandler} from "msw";


export const handlers: HttpHandler[] = [
  ...RKOHandlers,
  ...servicePackagesHandlers
]
