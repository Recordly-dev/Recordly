const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.json({ data: "logout completed" });
  });
};

export default { logout };
