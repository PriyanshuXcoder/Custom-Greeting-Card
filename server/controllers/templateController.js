const Template = require("../models/Template");

// GET /api/templates
const getAllTemplates = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const templates = await Template.find(filter).sort({ createdAt: -1 });
    res.json(templates);
  } catch (err) {
    console.error("Fetch templates error:", err.message);
    res.status(500).json({ message: "Could not fetch templates" });
  }
};

// GET /api/templates/:id
const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.json(template);
  } catch (err) {
    console.error("Get template error:", err.message);
    res.status(500).json({ message: "Error fetching template" });
  }
};

// POST /api/templates  (admin only, optional)
const createTemplate = async (req, res) => {
  try {
    const template = await Template.create(req.body);
    res.status(201).json(template);
  } catch (err) {
    console.error("Create template error:", err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllTemplates, getTemplateById, createTemplate };
