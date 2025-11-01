import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.router.js";
import connection from "./db/mongodb.js";
import passport from "./utils/passport.js";

dotenv.config();
const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Connection
connection();

// Session
app.use(
  session({
    secret: "mySuperSecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("🌐 Google Auth Server Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
