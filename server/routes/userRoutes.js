const express = require("express");
const router = express.Router();
const { updateProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// protect first, then handle file upload
router.put("/profile", protect, upload.single("profileImage"), updateProfile);

module.exports = router;
