const checkLogin = (req, res, next) => {
  if (!req?.user) {
    throw new ForbiddenError("Not User", {
      user,
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

export default { checkLogin, checkNotLogin };
