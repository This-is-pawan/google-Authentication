const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const { connection } = require("./db/mongodb");
require("./auth/Google");

const app = express();
const port = 3000;

// DB
connection();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// test route
app.get("/", (req, res) => {
  res.send("Backend running on 3000");
});

/* ================= GOOGLE LOGIN ROUTES ================= */

// STEP 1: start google login
app.get(
  "/login-with-google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get("/api/auth/user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message:'' });
  }
  const u = req.user; 
  res.json({
    success: true,
    user: {
      id: u._id,
      name: u.name,
      email: u.email,
      photo: u.photo,
    },
  });
});
// STEP 2: google callback
app.get(
  "/login-with-google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    // success
    res.redirect("http://localhost:5173");
  }
);

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
