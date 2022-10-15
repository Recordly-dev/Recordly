import express from "express";
import passport from "passport";

import midAuth from "#middlewares/auth.js";
import midError from "#middlewares/error.js";
import authApi from "#controllers/authApi.js";

const router = express.Router();

router
  .route("/google")
  .get(
    midError.asyncWrapper(midAuth.checkNotLogin),
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

router.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: `${process.env.PROTOCOL}://${process.env.CLIENT_HOST}/main`,
    failureRedirect: `${process.env.PROTOCOL}://${process.env.CLIENT_HOST}`,
  })
);

router
  .route("/logout")
  .get(midError.asyncWrapper(midAuth.checkLogin), authApi.logout);

export default router;
