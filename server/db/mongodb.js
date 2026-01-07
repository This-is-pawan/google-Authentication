const dotenv=require('dotenv').config()
const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error.message);
    process.exit(1); // stop app if DB fails
  }
};

module.exports = { connection };
