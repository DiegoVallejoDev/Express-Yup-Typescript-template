import * as Yup from "yup";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware function that validates the request body, query, and params against a Yup schema.
 * If validation fails, it returns a 500 status code with the error message.
 * If validation succeeds, it calls the next middleware function.
 * @param schema - The Yup schema to validate against.
 */
export const validate =
  (schema: Yup.AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    // catch errors from yup should be any type 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(500).json({ type: err.name, message: err.message });
    }
  };
