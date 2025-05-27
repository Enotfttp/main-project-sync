import { setupServer } from 'msw/node';
import { handlers } from './hadlers/index';

export const server = setupServer(...handlers);
