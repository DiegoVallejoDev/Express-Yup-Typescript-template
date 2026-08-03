import type { InferType } from 'yup';
import { Express, Request, Response } from 'express';
import { Route } from './Route';

import { personSchema } from '../schemas/personschema';
import { validate } from '../middleware/validation';
import { personUtils } from '../utils/personUtils';

type ValidatedHello = InferType<typeof personSchema>;

const Routes = [
  {
    path: '/',
    method: 'get',
    handler: [
      (_req: Request, res: Response) => {
        res.send(
          `Hello World!, please visit <a href="/hello">/hello</a> to see the magic`,
        );
      },
    ],
  },
  {
    // receive a request with a body that has a Person Schema (name and age property)
    path: '/hello',
    method: 'get',
    handler: [
      validate(personSchema),
      (_req: Request, res: Response<unknown, { validated: ValidatedHello }>) => {
        res.send(personUtils(res.locals.validated.query));
      },
    ],
  },
] as Route[];

/**
 * Injects the defined routes into the provided Express app instance.
 * @param app The Express app instance to inject the routes into.
 */
export const injectRoutes = (app: Express) => {
  Routes.forEach((route: Route) => {
    const { method, path, handler } = route;
    app[method](path, ...handler);
  });
};
