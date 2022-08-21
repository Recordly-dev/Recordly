import modUser from "#models/user.js";

import ForbiddenError from "#error/ForbiddenError.js";

const checkLogin = async (req, res, next) => {
  if (!req?.user || !(await modUser.exists({ _id: req.user.id }))) {
    throw new ForbiddenError("Not Authorized User", {
      originalUrl: req.originalUrl,
    });
  }

  next();
};

const checkNotLogin = (req, res, next) => {
  if (req?.user) {
    res.redirect("http://localhost:3000/main");
    return;
  }
  next();
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.json({ data: "logout completed" });
  });
};

export default { checkLogin, checkNotLogin, logout };
