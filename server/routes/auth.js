import express from "express";
import passport from "passport";

import authMid from "#middlewares/auth.js";

const router = express.Router();

router
  .route("/google")
  .get(
    authMid.checkNotLogin,
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

router.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/main",
    failureRedirect: "http://localhost:3000",
  })
);

router.route("/logout").get((req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.json({ data: "logout completed" });
  });
});

export default router;
