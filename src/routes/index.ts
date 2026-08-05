import type { Express } from 'express';
import { route, defineRoutes, injectRoutes as mount } from './defineRoute';
import { personSchema } from '../schemas/person';
import { home } from '../controllers/home';
import { createGreeting } from '../controllers/person';

export const routes = defineRoutes([
  route('get', '/').handle(home),
  route('get', '/hello')
    .schema(personSchema)
    .handle(({ validated }) => createGreeting(validated.query)),
]);

export const injectRoutes = (app: Express): void => mount(app, routes);
