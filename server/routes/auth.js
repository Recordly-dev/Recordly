import express from "express";
import passport from "passport";

import authMid from "#middlewares/auth.js";
import authApi from "#controllers/authApi.js";

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

router.route("/logout").get(authMid.checkLogin, authApi.logout);

export default router;
