const User = require("../models/User");

// PUT /api/user/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update name if provided
    if (req.body.name) {
      user.name = req.body.name;
    }

    // if a file was uploaded (via multer), save the path
    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    const updated = await user.save();

    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      profileImage: updated.profileImage,
      isPremium: updated.isPremium,
    });
  } catch (err) {
    console.error("Update profile error:", err.message);
    res.status(500).json({ message: "Profile update failed" });
  }
};

module.exports = { updateProfile };
