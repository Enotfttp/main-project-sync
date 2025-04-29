import {RKOHandlers} from './RKOHandlers'
import {servicePackagesHandlers} from './ServicePackagesHandlers'
import {serviceConnectsHandlers} from "./ServiceConnetcsHandlers";
import {eventsHandlers} from "./EventsHandlers";
import {periodsHandlers} from "./PeriodsHandlers";
import {HttpHandler} from "msw";


export const handlers: HttpHandler[] = [
  ...RKOHandlers,
  ...servicePackagesHandlers,
  ...serviceConnectsHandlers,
  ...eventsHandlers,
  ...periodsHandlers,

]
