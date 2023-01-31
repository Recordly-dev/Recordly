import { NextFunction, Request, Response } from "express";

import AuthenticationError from "../utils/error/AuthenticationError";

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => res.json({ data: "logout completed" }));
  });
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  const { username, profileImage, email } = req.user;
  res.send({
    username,
    profileImage,
    email,
  });
};

export default { logout, getProfile };
