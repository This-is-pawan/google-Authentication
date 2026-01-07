const dotenv = require("dotenv");
dotenv.config();
const cookieParser=require('cookie-parser')
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { connection } = require("./db/mongodb");
const cors=require('cors')
require("./auth/Google"); // passport strategy

const app = express();
const port = process.env.PORT || 4000;

// connect DB
connection();
app.use(cookieParser());
// middlewares
app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());



// home page
app.get("/", (req, res) => {
  res.redirect('http://localhost:5173');
});

// google login
app.get(
  "/login-with-google",
  passport.authenticate("google", {
    scope: ["profile", "email" ]
  })
);

// google callback
app.get(
  "/login-with-google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    res.redirect("http://localhost:5173"); 
  }
);

// failed login
app.get("/failed", (req, res) => {
  res.json({ success: false, message: "Google authentication failed" });
});
app.get("/api/auth/user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false });
  }

  const u = req.user; // MongoDB user

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




// logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
