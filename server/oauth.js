import passport from "passport";
import passportGoogle from "passport-google-oauth2";
const GoogleStrategy = passportGoogle.Strategy;

import modUser from "#models/user.js";
import authMid from "#middlewares/auth.js";

export default function initOAuth(app) {
  // passport 초기화 및 session 연결
  app.use(passport.initialize());
  app.use(passport.session());

  // login이 최초로 성공했을 때만 호출되는 함수
  // done(null, user.id)로 세션을 초기화한다.
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // 사용자가 페이지를 방문할 때마다 호출되는 함수
  // done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
  passport.deserializeUser(function (id, done) {
    console.log("deserializeUser!!");
    modUser.findById(id, (err, user) => {
      done(null, user);
    });
  });

  // Google login 전략
  // 로그인 성공 시 callback으로 request, accessToken, refreshToken, profile 등이 나온다.
  // 해당 콜백 function에서 사용자가 누구인지 done(null, user) 형식으로 넣으면 된다.
  // 이 예시에서는 넘겨받은 profile을 전달하는 것으로 대체했다.

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/auth/google/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        const {
          email,
          displayName: username,
          id: oauthId,
          picture: profileImage,
        } = profile;
        modUser.findOrCreate(
          { email, username, oauthId, profileImage },
          (err, user) => {
            return done(err, user);
          }
        );
      }
    )
  );

  app.get(
    "/api/auth/google",
    authMid.checkNotLogin,
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "http://localhost:3000/main",
      failureRedirect: "http://localhost:3000",
    })
  );
  app.get("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy();
      res.json({ data: "logout completed" });
    });
  });
}
