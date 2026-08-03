import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

export const validate =
  (schema: Yup.AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.validated = await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false },
      );
      return next();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({
          error: {
            type: 'validation_error',
            message: 'Request validation failed',
            details: error.errors,
          },
        });
      }

      return next(error);
    }
  };
