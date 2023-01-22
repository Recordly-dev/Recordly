import { NextFunction, Request, Response } from "express";

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => res.json({ data: "logout completed" }));
  });
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { username, profileImage, email } = req.user;
  res.send({
    username,
    profileImage,
    email,
  });
};

export default { logout, getProfile };
