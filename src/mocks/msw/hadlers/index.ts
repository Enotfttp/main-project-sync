import { HttpHandler } from 'msw';
import { RKOHandlers } from './RKOHandlers';
import { serviceConnectsHandlers } from './ServiceConnetcsHandlers';
import { eventsHandlers } from './EventsHandlers';
import { periodsHandlers } from './PeriodsHandlers';

export const handlers: HttpHandler[] = [...RKOHandlers, ...serviceConnectsHandlers, ...eventsHandlers, ...periodsHandlers];
