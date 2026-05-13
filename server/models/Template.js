const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      // categories we support for now
      enum: ["Birthday", "Wedding", "Festival", "Anniversary", "Congratulations", "Eid", "Diwali", "Christmas", "Other"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    // where should the profile pic go (as % of card dimensions)
    profilePosition: {
      top: { type: String, default: "10%" },
      left: { type: String, default: "50%" },
      size: { type: String, default: "80px" },
    },
    // where the name text goes
    namePosition: {
      top: { type: String, default: "55%" },
      left: { type: String, default: "50%" },
    },
    fontSize: {
      type: Number,
      default: 18,
    },
    fontColor: {
      type: String,
      default: "#ffffff",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);
