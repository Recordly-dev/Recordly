import passport from "passport";

const googleLogin = (req, res) => {
  console.log("googleLogin!!!");
  passport.authenticate("google", { scope: ["email", "profile"] });
};

export default { googleLogin };
