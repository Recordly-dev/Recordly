import * as passport from "passport";
import { Strategy } from "passport-google-oauth2";
import { Request } from "express";
import { Express } from "express-serve-static-core";
import { VerifyCallback } from "passport-google-oauth2";

import modUser from "./models/user";
import { IUser } from "./types/models/user";

export default function initOAuth(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  // 최초 회원 가입 시 실행
  passport.serializeUser((user, done) => {
    console.log("serializeUser!!");
    done(null, user._id);
  });

  // 기존 회원 로그인 시 실행
  passport.deserializeUser((id, done) => {
    modUser.findById(id, (err: NativeError | null, user: IUser) => {
      done(err, user);
    });
  });

  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.PROTOCOL}://${process.env.HOST}/api/auth/google/callback`,
        passReqToCallback: true,
      },
      async (
        request: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
      ) => {
        const {
          email,
          displayName: username,
          id: oauthId,
          picture: profileImage,
        } = profile;
        try {
          const findedUser = await modUser.findOne({ email }).lean().exec();
          if (findedUser) {
            done(null, findedUser);
          } else {
            const createdUser = await modUser.create({
              email,
              username,
              oauthId,
              profileImage,
            });
            done(null, createdUser);
          }
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
}
