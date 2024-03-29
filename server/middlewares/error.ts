import { NextFunction, Request, Response } from "express";

interface AsyncRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

const asyncWrapper =
  (asyncFunc: AsyncRequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFunc(req, res, next);
    } catch (err) {
      console.error({
        err,
        url: req.url,
        query: req.query,
        params: req.params,
        body: req.body,
        headers: req.headers,
      });
      next(err);
    }
  };

export default { asyncWrapper };
