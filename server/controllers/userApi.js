import passport from "passport";

const googleLogin = (req, res) => {
  passport.authenticate("google", { scope: ["email", "profile"] });
};

export default { googleLogin };
