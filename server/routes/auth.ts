import { Router } from "express";
import * as passport from "passport";

import midAuth from "../middlewares/auth";
import midError from "../middlewares/error";
import authApi from "../controllers/authApi";

const router = Router();

router
  .route("/google")
  .get(midError.asyncWrapper(midAuth.checkNotLogin), () =>
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

router.route("/google/callback").get(() =>
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/main",
    failureRedirect: "http://localhost:3000",
  })
);

router
  .route("/logout")
  .get(midError.asyncWrapper(midAuth.checkLogin), authApi.logout);

export default router;
