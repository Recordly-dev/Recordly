import { NextFunction, Request, Response } from "express";
import modUser from "../models/user";

import AuthenticationError from "../errors/AuthenticationError";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req?.user || !(await modUser.exists({ _id: req.user._id }))) {
    throw new AuthenticationError();
  }

  next();
};

const checkNotLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && (await modUser.exists({ _id: req.user._id }))) {
    res.redirect(`${process.env.PROTOCOL}://${process.env.CLIENT_HOST}/main`);
    return;
  }
  next();
};

export default { checkLogin, checkNotLogin };
