const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID =
  "1040466111018-b6olqcf87uipqep4cgvq7cpb3d0ljjd6.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

module.exports = {
  initOAuth: (app) => {
    // passport 초기화 및 session 연결
    app.use(passport.initialize());
    app.use(passport.session());

    // login이 최초로 성공했을 때만 호출되는 함수
    // done(null, user.id)로 세션을 초기화 한다.
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    // 사용자가 페이지를 방문할 때마다 호출되는 함수
    // done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
    passport.deserializeUser(function (id, done) {
      done(null, id);
    });

    // Google login 전략
    // 로그인 성공 시 callback으로 request, accessToken, refreshToken, profile 등이 나온다.
    // 해당 콜백 function에서 사용자가 누구인지 done(null, user) 형식으로 넣으면 된다.
    // 이 예시에서는 넘겨받은 profile을 전달하는 것으로 대체했다.
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:8080/auth/google/callback",
          passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
          console.log(profile);
          console.log(accessToken);

          return done(null, profile);
        }
      )
    );
  },
};
