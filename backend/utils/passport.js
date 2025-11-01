import passport from "passport";
import GoogleProvider from "./GoogleStregy.js";

passport.use(GoogleProvider);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
