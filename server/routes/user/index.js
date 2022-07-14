import express from "express";
import passport from "passport";
import fs from "fs";

import modAccount from "../../models/user.js";

const router = express.Router();

// image 사용을 위한 static folder 지정
// app.use(express.static("public"));

// login 화면
// 이미 로그인한 회원이라면(session 정보가 존재한다면) main화면으로 리다이렉트
router.get("/login", (req, res) => {
  if (req.user) return res.redirect("/");
  fs.readFile("./webpage/login.html", (error, data) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

// login 화면
// 로그인 하지 않은 회원이라면(session 정보가 존재하지 않는다면) login화면으로 리다이렉트
router.get("/", (req, res) => {
  if (!req.user) return res.redirect("/login");
  fs.readFile("./webpage/main.html", (error, data) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

// google login 화면
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
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
