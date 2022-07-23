const checkUser = (req, res, next) => {
  if (!req?.user?.session) {
    throw new ForbiddenError("Not User", {
      user,
      originalUrl: req.originalUrl,
    });
  }

  next();
};

const checkNotLogin = (req, res, next) => {
  if (req?.user?.session) {
    res.redirect("/");
  }

  next();
};

export default { checkUser, checkNotLogin };
