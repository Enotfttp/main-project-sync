import { HttpHandler } from 'msw';
import { RKOHandlers } from './RKOHandlers';
import { servicePackagesHandlers } from './ServicePackagesHandlers';
import { serviceConnectsHandlers } from './ServiceConnetcsHandlers';
import { eventsHandlers } from './EventsHandlers';
import { periodsHandlers } from './PeriodsHandlers';

export const handlers: HttpHandler[] = [
  ...RKOHandlers,
  ...servicePackagesHandlers,
  ...serviceConnectsHandlers,
  ...eventsHandlers,
  ...periodsHandlers,
];
