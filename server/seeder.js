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
        // Birthday
        {
          title: "Happy Birthday Vibes", category: "Birthday",
          imageUrl: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false, trending: true,
          profilePosition: { top: "15%", left: "50%", size: "100px" }, namePosition: { top: "60%", left: "50%" }, fontColor: "#ffffff"
        },
        {
          title: "Premium Birthday Gold", category: "Birthday",
          imageUrl: "https://images.unsplash.com/photo-1530103862676-de88b628f800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true, trending: true,
          profilePosition: { top: "20%", left: "50%", size: "120px" }, namePosition: { top: "65%", left: "50%" }, fontColor: "#fde047"
        },
        {
          title: "Kids Fun Birthday", category: "Birthday",
          imageUrl: "https://images.unsplash.com/photo-1560361280-5a3d7d70c40e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false, trending: false,
          profilePosition: { top: "25%", left: "50%", size: "90px" }, namePosition: { top: "70%", left: "50%" }, fontColor: "#ffffff"
        },
        // Wedding
        {
          title: "Elegant Wedding", category: "Wedding",
          imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true, trending: false,
          profilePosition: { top: "15%", left: "50%", size: "100px" }, namePosition: { top: "70%", left: "50%" }, fontColor: "#333333"
        },
        {
          title: "Floral Wedding Minimal", category: "Wedding",
          imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false, trending: true,
          profilePosition: { top: "10%", left: "50%", size: "110px" }, namePosition: { top: "60%", left: "50%" }, fontColor: "#ffffff"
        },
        // Festival
        {
          title: "Spring Festival", category: "Festival",
          imageUrl: "https://images.unsplash.com/photo-1516975480287-6e3dd4d95b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false, trending: false,
          profilePosition: { top: "20%", left: "50%", size: "95px" }, namePosition: { top: "65%", left: "50%" }, fontColor: "#ffffff"
        },
        {
          title: "Grand Festival Premium", category: "Festival",
          imageUrl: "https://images.unsplash.com/photo-1519802772250-a52a9af0eacb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true, trending: true,
          profilePosition: { top: "15%", left: "50%", size: "110px" }, namePosition: { top: "55%", left: "50%" }, fontColor: "#fde047"
        },
        // Anniversary
        {
          title: "Classic Anniversary", category: "Anniversary",
          imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false, trending: true,
          profilePosition: { top: "20%", left: "50%", size: "100px" }, namePosition: { top: "60%", left: "50%" }, fontColor: "#ffffff"
        },
        {
          title: "Diamond Anniversary", category: "Anniversary",
          imageUrl: "https://images.unsplash.com/photo-1513271790400-98319889781d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true, trending: false,
          profilePosition: { top: "10%", left: "50%", size: "120px" }, namePosition: { top: "65%", left: "50%" }, fontColor: "#ffffff"
        },
        // Congratulations
        {
          title: "Simple Congrats", category: "Congratulations",
          imageUrl: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false, trending: false,
          profilePosition: { top: "15%", left: "50%", size: "90px" }, namePosition: { top: "55%", left: "50%" }, fontColor: "#ffffff"
        },
        {
          title: "Graduation Premium", category: "Congratulations",
          imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true, trending: true,
          profilePosition: { top: "20%", left: "50%", size: "100px" }, namePosition: { top: "70%", left: "50%" }, fontColor: "#ffffff"
        },
        // Eid
        {
          title: "Eid Mubarak", category: "Eid",
          imageUrl: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false, trending: true,
          profilePosition: { top: "20%", left: "50%", size: "100px" }, namePosition: { top: "60%", left: "50%" }, fontColor: "#ffffff"
        },
        {
          title: "Royal Eid Crescent", category: "Eid",
          imageUrl: "https://images.unsplash.com/photo-1588722143003-888a7d1885f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true, trending: false,
          profilePosition: { top: "15%", left: "50%", size: "110px" }, namePosition: { top: "65%", left: "50%" }, fontColor: "#facc15"
        },
        // Diwali
        {
          title: "Festive Diwali Lights", category: "Diwali",
          imageUrl: "https://images.unsplash.com/photo-1574343105741-94f479701048?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false, trending: false,
          profilePosition: { top: "10%", left: "50%", size: "90px" }, namePosition: { top: "50%", left: "50%" }, fontColor: "#ffffff"
        },
        {
          title: "Golden Diwali Diyas", category: "Diwali",
          imageUrl: "https://images.unsplash.com/photo-1602747372791-c4fc86c8f615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true, trending: true,
          profilePosition: { top: "15%", left: "50%", size: "110px" }, namePosition: { top: "60%", left: "50%" }, fontColor: "#fde047"
        },
        // Christmas
        {
          title: "Merry Christmas Snow", category: "Christmas",
          imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false, trending: true,
          profilePosition: { top: "25%", left: "50%", size: "100px" }, namePosition: { top: "70%", left: "50%" }, fontColor: "#ffffff"
        },
        {
          title: "Premium Xmas Tree", category: "Christmas",
          imageUrl: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true, trending: false,
          profilePosition: { top: "15%", left: "50%", size: "120px" }, namePosition: { top: "65%", left: "50%" }, fontColor: "#ffffff"
        },
        // Other
        {
          title: "Just Because", category: "Other",
          imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: false, trending: false,
          profilePosition: { top: "20%", left: "50%", size: "90px" }, namePosition: { top: "60%", left: "50%" }, fontColor: "#ffffff"
        },
        {
          title: "Thank You Premium", category: "Other",
          imageUrl: "https://images.unsplash.com/photo-1495422964230-2e3eb8c39d89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          premium: true, trending: true,
          profilePosition: { top: "15%", left: "50%", size: "110px" }, namePosition: { top: "65%", left: "50%" }, fontColor: "#ffffff"
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
