import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=7c3aed&color=fff&size=200`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      if (selectedFile) formData.append("profileImage", selectedFile);

      const res = await API.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateUser(res.data);
      toast.success("Profile updated ✅");
      setSelectedFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar selectedCategory="All" onSelectCategory={() => navigate("/")} />

      <div className="main-content">
        <Topbar searchValue="" onSearchChange={() => {}} />

        <div className="page-body fade-in">
          <div className="profile-layout">
            <h1
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "#1e1b4b",
                marginBottom: "4px",
              }}
            >
              My Profile
            </h1>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
              Your photo and name appear on all greeting cards
            </p>

            {/* Photo section */}
            <div className="profile-photo-section">
              <div className="profile-photo-wrap">
                <img
                  src={imagePreview || defaultAvatar}
                  alt="Profile"
                />
                <button
                  className="photo-edit-btn"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  ✎
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <div>
                <p style={{ fontWeight: 600, fontSize: "15px", color: "#1e1b4b" }}>{user?.name}</p>
                <p style={{ fontSize: "12.5px", color: "#6b7280", marginTop: "3px" }}>{user?.email}</p>
                {selectedFile && (
                  <p style={{ fontSize: "12px", color: "#059669", marginTop: "6px", background: "#d1fae5", padding: "3px 10px", borderRadius: "99px", display: "inline-block" }}>
                    ✓ New photo selected
                  </p>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{ display: "block", marginTop: "8px", fontSize: "12.5px", color: "#7c3aed", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 }}
                >
                  Change Photo
                </button>
              </div>
            </div>

            {/* Edit form */}
            <form className="profile-form-card" onSubmit={handleSave}>
              <div className="form-group">
                <label>Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="form-input"
                  style={{ background: "#f9fafb", color: "#9ca3af", cursor: "not-allowed" }}
                />
                <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                  Email cannot be changed
                </p>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    padding: "4px 12px",
                    borderRadius: "99px",
                    background: user?.isPremium ? "#fef3c7" : "#f3f4f6",
                    color: user?.isPremium ? "#92400e" : "#6b7280",
                    fontWeight: 600,
                    border: `1px solid ${user?.isPremium ? "#fde68a" : "#e5e7eb"}`,
                  }}
                >
                  {user?.isPremium ? "⭐ Premium Member" : "🔓 Free Plan"}
                </span>
              </div>

              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>

            <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "16px" }}>
              Member since{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long" })
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
