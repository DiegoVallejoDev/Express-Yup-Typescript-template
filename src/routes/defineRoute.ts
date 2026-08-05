import type { Request, Response, RequestHandler, Express } from 'express';
import * as Yup from 'yup';
import { validate } from '../middleware/validation';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface RouteDefinition {
  path: string;
  method: HttpMethod;
  middleware: RequestHandler[];
}

interface RouteBuilderState {
  path: string;
  method: HttpMethod;
  middleware: RequestHandler[];
}

export function route(method: HttpMethod, path: string) {
  const state: RouteBuilderState = { path, method, middleware: [] };

  const build = (): RouteDefinition => ({
    path: state.path,
    method: state.method,
    middleware: state.middleware,
  });

  return {
    schema: <S extends Yup.AnyObjectSchema>(schema: S) => {
      state.middleware.push(validate(schema) as RequestHandler);
      return {
        handle: (
          handler: (
            ctx: { validated: Yup.InferType<S> },
            req: Request,
            res: Response,
          ) => unknown | Promise<unknown>,
        ) => {
          state.middleware.push(async (req, res, next) => {
            try {
              const result = await handler(
                { validated: res.locals.validated as Yup.InferType<S> },
                req,
                res,
              );
              if (!res.headersSent) res.send(result);
            } catch (error) {
              next(error as Error);
            }
          });
          return build();
        },
      };
    },
    handle: (handler: (req: Request, res: Response) => unknown | Promise<unknown>) => {
      state.middleware.push(async (req, res, next) => {
        try {
          const result = await handler(req, res);
          if (!res.headersSent) res.send(result);
        } catch (error) {
          next(error as Error);
        }
      });
      return build();
    },
  };
}

export const defineRoutes = (routes: RouteDefinition[]): RouteDefinition[] => routes;

export const injectRoutes = (app: Express, routes: RouteDefinition[]): void => {
  for (const definition of routes) {
    app[definition.method](definition.path, ...definition.middleware);
  }
};
