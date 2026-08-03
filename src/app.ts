import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { injectRoutes } from './routes';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(error);
  }
  const message =
    process.env.NODE_ENV === 'development' ? error.message : 'Internal server error';

  res.status(500).json({
    error: {
      type: 'internal_error',
      message,
    },
  });
};

export const createApp = (): Express => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  injectRoutes(app);

  app.use((_req, res) => {
    res.status(404).json({
      error: {
        type: 'not_found',
        message: 'Route not found',
      },
    });
  });
  app.use(errorHandler);

  return app;
};
