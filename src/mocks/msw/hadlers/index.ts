import { HttpHandler } from 'msw';
import { RKOHandlers } from './RKOHandlers';
import { serviceConnectsHandlers } from './ServiceConnetcsHandlers';
import { eventsHandlers } from './EventsHandlers';
import { periodsHandlers } from './PeriodsHandlers';
import { authHandlers } from '@mocks/msw/hadlers/AuthHandlers.ts';

export const handlers: HttpHandler[] =
  [
    ...RKOHandlers,
    ...serviceConnectsHandlers,
    ...eventsHandlers,
    ...periodsHandlers,
    ...authHandlers
  ];
