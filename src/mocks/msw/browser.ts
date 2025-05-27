import { setupWorker } from 'msw/browser';
import { handlers } from './hadlers/index';

export const worker = setupWorker(...handlers);
