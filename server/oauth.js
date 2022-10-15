import passport from "passport";
import passportGoogle from "passport-google-oauth2";
const GoogleStrategy = passportGoogle.Strategy;

import modUser from "#models/user.js";

export default function initOAuth(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // 최초 회원 가입 시 실행
  passport.serializeUser(function (user, done) {
    console.log("serializeUser!!");
    done(null, user.id);
  });

  // 기존 회원 로그인 시 실행
  passport.deserializeUser(function (id, done) {
    modUser.findById(id, (err, user) => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.PROTOCOL}://${process.env.SERVER_HOST}/api/auth/google/callback`,
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
}
