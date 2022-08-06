import modUser from "#models/user.js";

const checkLogin = async (req, res, next) => {
  if (!req?.user || !(await modUser.exists({ _id: req.uesr.id }))) {
    throw new ForbiddenError("Not User", {
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
