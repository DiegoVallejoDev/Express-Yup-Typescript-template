import * as Yup from "yup";
import { Request, Response, NextFunction } from "express";

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
