import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

type ValidatedLocals<S extends Yup.AnyObjectSchema> = {
  validated: Yup.InferType<S>;
};

export const validate =
  <S extends Yup.AnyObjectSchema>(schema: S) =>
  async (
    req: Request,
    res: Response<unknown, ValidatedLocals<S>>,
    next: NextFunction,
  ) => {
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
