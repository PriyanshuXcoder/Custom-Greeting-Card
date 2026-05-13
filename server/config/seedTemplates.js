const mongoose = require("mongoose");
const Template = require("../models/Template");
require("dotenv").config();

const templates = [
  {
    title: "Happy Birthday Celebration",
    category: "Birthday",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    premium: false,
    trending: true,
    profilePosition: { top: "12%", left: "50%", size: "90px" },
    namePosition: { top: "58%", left: "50%" },
    fontSize: 22,
    fontColor: "#ffffff",
  },
  {
    title: "Birthday Balloons",
    category: "Birthday",
    imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80",
    premium: false,
    trending: false,
    profilePosition: { top: "8%", left: "50%", size: "85px" },
    namePosition: { top: "62%", left: "50%" },
    fontSize: 20,
    fontColor: "#ff6b6b",
  },
  {
    title: "Golden Birthday",
    category: "Birthday",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80",
    premium: true,
    trending: true,
    profilePosition: { top: "10%", left: "50%", size: "95px" },
    namePosition: { top: "60%", left: "50%" },
    fontSize: 24,
    fontColor: "#ffd700",
  },
  {
    title: "Wedding Bells",
    category: "Wedding",
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80",
    premium: false,
    trending: true,
    profilePosition: { top: "8%", left: "50%", size: "88px" },
    namePosition: { top: "65%", left: "50%" },
    fontSize: 20,
    fontColor: "#f5f0eb",
  },
  {
    title: "Elegant Wedding",
    category: "Wedding",
    imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=80",
    premium: true,
    trending: false,
    profilePosition: { top: "15%", left: "50%", size: "80px" },
    namePosition: { top: "55%", left: "50%" },
    fontSize: 22,
    fontColor: "#d4a017",
  },
  {
    title: "Happy Diwali",
    category: "Diwali",
    imageUrl: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=500&q=80",
    premium: false,
    trending: true,
    profilePosition: { top: "10%", left: "50%", size: "82px" },
    namePosition: { top: "60%", left: "50%" },
    fontSize: 20,
    fontColor: "#ffa500",
  },
  {
    title: "Diwali Sparkle",
    category: "Diwali",
    imageUrl: "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=500&q=80",
    premium: true,
    trending: false,
    profilePosition: { top: "12%", left: "50%", size: "90px" },
    namePosition: { top: "62%", left: "50%" },
    fontSize: 22,
    fontColor: "#ffcc00",
  },
  {
    title: "Merry Christmas",
    category: "Christmas",
    imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=500&q=80",
    premium: false,
    trending: false,
    profilePosition: { top: "8%", left: "50%", size: "78px" },
    namePosition: { top: "58%", left: "50%" },
    fontSize: 18,
    fontColor: "#ffffff",
  },
  {
    title: "Christmas Premium",
    category: "Christmas",
    imageUrl: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=500&q=80",
    premium: true,
    trending: true,
    profilePosition: { top: "10%", left: "50%", size: "85px" },
    namePosition: { top: "60%", left: "50%" },
    fontSize: 20,
    fontColor: "#c8102e",
  },
  {
    title: "Happy Eid Mubarak",
    category: "Eid",
    imageUrl: "https://images.unsplash.com/photo-1607242792481-be0073e05f0a?w=500&q=80",
    premium: false,
    trending: true,
    profilePosition: { top: "8%", left: "50%", size: "80px" },
    namePosition: { top: "60%", left: "50%" },
    fontSize: 20,
    fontColor: "#c5a028",
  },
  {
    title: "Happy Anniversary",
    category: "Anniversary",
    imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&q=80",
    premium: false,
    trending: false,
    profilePosition: { top: "10%", left: "50%", size: "85px" },
    namePosition: { top: "62%", left: "50%" },
    fontSize: 20,
    fontColor: "#e91e63",
  },
  {
    title: "Congratulations Graduate",
    category: "Congratulations",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80",
    premium: false,
    trending: true,
    profilePosition: { top: "10%", left: "50%", size: "80px" },
    namePosition: { top: "58%", left: "50%" },
    fontSize: 18,
    fontColor: "#ffffff",
  },
  {
    title: "Festival Colors",
    category: "Festival",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&q=80",
    premium: false,
    trending: false,
    profilePosition: { top: "10%", left: "50%", size: "82px" },
    namePosition: { top: "60%", left: "50%" },
    fontSize: 20,
    fontColor: "#ffffff",
  },
  {
    title: "Premium Festival Special",
    category: "Festival",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
    premium: true,
    trending: true,
    profilePosition: { top: "12%", left: "50%", size: "90px" },
    namePosition: { top: "62%", left: "50%" },
    fontSize: 22,
    fontColor: "#ff6b6b",
  },
];

const seedTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Template.deleteMany({});
    console.log("Cleared existing templates");

    await Template.insertMany(templates);
    console.log(`Seeded ${templates.length} templates`);

    mongoose.connection.close();
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
};

seedTemplates();
