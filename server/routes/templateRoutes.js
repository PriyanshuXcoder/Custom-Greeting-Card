const express = require("express");
const router = express.Router();
const { getAllTemplates, getTemplateById, createTemplate } = require("../controllers/templateController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllTemplates);
router.get("/:id", getTemplateById);
// creating templates is optional/admin — protect it for now
router.post("/", protect, createTemplate);

module.exports = router;
