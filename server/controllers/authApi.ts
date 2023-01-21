const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.json({ data: "logout completed" });
  });
};

const getProfile = async (req, res, next) => {
  const { username, profileImage, email } = req.user;
  res.send({
    username,
    profileImage,
    email,
  });
};

export default { logout, getProfile };
