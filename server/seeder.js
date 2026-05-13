const User = require("./models/User");
const Template = require("./models/Template");

const seedData = async () => {
  try {
    // 1. Seed Guest User
    const guestExists = await User.findOne({ email: "guest@wishcraft.com" });
    if (!guestExists) {
      await User.create({
        name: "Guest User",
        email: "guest@wishcraft.com",
        password: "guest123",
      });
      console.log("Guest user seeded.");
    }

    // 2. Seed Templates
    const count = await Template.countDocuments();
    if (count === 0) {
      const templates = [
        {
          title: "Happy Birthday Vibes",
          category: "Birthday",
          imageUrl: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false,
          trending: true,
          profilePosition: { top: "15%", left: "50%", size: "100px" },
          namePosition: { top: "60%", left: "50%" },
          fontColor: "#ffffff"
        },
        {
          title: "Premium Birthday Gold",
          category: "Birthday",
          imageUrl: "https://images.unsplash.com/photo-1530103862676-de88b628f800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true,
          trending: true,
          profilePosition: { top: "20%", left: "50%", size: "120px" },
          namePosition: { top: "65%", left: "50%" },
          fontColor: "#fde047"
        },
        {
          title: "Festive Diwali Lights",
          category: "Diwali",
          imageUrl: "https://images.unsplash.com/photo-1574343105741-94f479701048?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false,
          trending: false,
          profilePosition: { top: "10%", left: "50%", size: "90px" },
          namePosition: { top: "50%", left: "50%" },
          fontColor: "#ffffff"
        },
        {
          title: "Elegant Wedding",
          category: "Wedding",
          imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true,
          trending: false,
          profilePosition: { top: "15%", left: "50%", size: "100px" },
          namePosition: { top: "70%", left: "50%" },
          fontColor: "#333333"
        },
        {
          title: "Eid Mubarak",
          category: "Eid",
          imageUrl: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false,
          trending: true,
          profilePosition: { top: "20%", left: "50%", size: "100px" },
          namePosition: { top: "60%", left: "50%" },
          fontColor: "#ffffff"
        }
      ];
      await Template.insertMany(templates);
      console.log("Templates seeded.");
    }
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

module.exports = seedData;
