import passport from "passport";
import passportGoogle from "passport-google-oauth2";
const GoogleStrategy = passportGoogle.Strategy;

import modUser from "#models/user.js";

export default function initOAuth(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    console.log("deserializeUser!!");
    modUser.findById(id, (err, user) => {
      done(null, user);
    });
  });

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
}
