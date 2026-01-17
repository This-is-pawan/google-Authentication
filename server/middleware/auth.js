const dotenv=require('dotenv').config()
const jwt = require("jsonwebtoken");
const User = require("../models/GoogleModel");

exports.isAuth = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    if (!token) return res.status(401).json({ msg: "Not logged in" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("name,email,photo,googleId,_id");
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};


