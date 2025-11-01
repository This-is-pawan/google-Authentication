import express from "express";
import passport from "../utils/passport.js";

const router = express.Router();

/* 
  STEP 1: Login with Google
  -------------------------
  Redirects the user to Google's OAuth consent screen
*/
router.get(
  "/login-with-google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent select_account", // 👈 Always show both screens
    accessType: "offline", // (optional) get refresh tokens for longer sessions
  })
);


/* 
  STEP 2: Google Callback
  -----------------------
  After successful login, Google redirects the user here.
  Passport processes the returned profile data.
*/
router.get(
  "/login-with-google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://google-authentication-frontend.onrender.com/failed",
  }),
  (req, res) => {
    const user = req.user;
    const redirectURL = `https://google-authentication-frontend.onrender.com/success?name=${encodeURIComponent(
      user.displayName
    )}&email=${encodeURIComponent(user.email)}&photo=${encodeURIComponent(
      user.photo
    )}`;
    res.redirect(redirectURL);
  }
);



/* 
  STEP 3: Failed route
  --------------------
  If authentication fails
*/
router.get("/failed", (req, res) => {
  res.status(401).send("❌ Login failed");
});

/* 
  STEP 4: Logout route
  --------------------
  Ends user session and redirects to homepage
*/
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect("https://google-authentication-frontend.onrender.com/");
    });
  });
});

router.get('/logout', async (req, res, next) => {
  try {
    // Passport logout method (ends the session)
    req.logout(err => {
      if (err) return next(err);
      // Optionally also clear session cookie
      req.session = null;
      return res.json({ message: 'Logout successful' });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
});








export default router;
