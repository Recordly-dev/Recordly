import express from "express";
import passport from "passport";

import midError from "#middlewares/error.js";
import midAuth from "#middlewares/auth.js";

import userCtrl from "#controllers/userApi.js";

const router = express.Router();

// image 사용을 위한 static folder 지정
// app.use(express.static("public"));

// login 화면
// 이미 로그인한 회원이라면(session 정보가 존재한다면) main화면으로 리다이렉트

// google login 화면
router.get(
  "/auth/google",
  midError.asyncWrapper(midAuth.checkNotLogin),
  midError.asyncWrapper(userCtrl.googleLogin)
);

// google login 성공과 실패 리다이렉트
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

export default router;
