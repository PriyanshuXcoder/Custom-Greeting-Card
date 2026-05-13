const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const seedGuest = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected");

    const exists = await User.findOne({ email: "guest@wishcraft.com" });
    if (exists) {
      console.log("Guest user already exists");
      return mongoose.connection.close();
    }

    await User.create({
      name: "Guest User",
      email: "guest@wishcraft.com",
      password: "guest123", // will be hashed by pre-save hook
    });

    console.log("Guest user created: guest@wishcraft.com / guest123");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seed guest error:", err.message);
    process.exit(1);
  }
};

seedGuest();
