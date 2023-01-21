import * as passport from "passport";
import { Strategy } from "passport-google-oauth2";

import modUser from "./models/user";

export default function initOAuth(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // 최초 회원 가입 시 실행
  passport.serializeUser(function (user, done) {
    console.log("serializeUser!!");
    done(null, user);
  });

  // 기존 회원 로그인 시 실행
  passport.deserializeUser(function (id, done) {
    modUser.findById(id, (err, user) => {
      done(null, user);
    });
  });

  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.PROTOCOL}://${process.env.SERVER_HOST}/api/auth/google/callback`,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        const {
          email,
          displayName: username,
          id: oauthId,
          picture: profileImage,
        } = profile;
        try {
          const findedUser = modUser.findOne({ email });
          if (findedUser) {
            done(findedUser);
          } else {
            const createdUser = modUser.create({
              email,
              username,
              oauthId,
              profileImage,
            });
            done(createdUser);
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );
}
