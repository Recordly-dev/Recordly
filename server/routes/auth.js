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

console.log("hihi");

router.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/main",
    failureRedirect: "http://localhost:3000",
  })
);

router
  .route("/logout")
  .get(midError.asyncWrapper(midAuth.checkLogin), authApi.logout);

export default router;
