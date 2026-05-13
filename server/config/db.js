const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    
    // Use memory server if using the placeholder or no URI
    if (!uri || uri.includes("cluster0.mongodb.net")) {
      console.log("Using MongoDB Memory Server as placeholder URI was detected...");
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
