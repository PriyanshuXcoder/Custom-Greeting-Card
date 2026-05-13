import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = [
  { label: "All Templates", emoji: "✨", value: "All" },
  { label: "Birthday", emoji: "🎂", value: "Birthday" },
  { label: "Wedding", emoji: "💍", value: "Wedding" },
  { label: "Festival", emoji: "🎊", value: "Festival" },
  { label: "Anniversary", emoji: "❤️", value: "Anniversary" },
  { label: "Congratulations", emoji: "🏆", value: "Congratulations" },
  { label: "Eid", emoji: "🌙", value: "Eid" },
  { label: "Diwali", emoji: "🪔", value: "Diwali" },
  { label: "Christmas", emoji: "🎄", value: "Christmas" },
];

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="logo-icon">🎉</span>
        <span className="logo-text">WishCraft</span>
      </div>

      {/* Categories */}
      <p className="sidebar-section-title">Browse</p>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          className={`sidebar-item ${selectedCategory === cat.value ? "active" : ""}`}
          onClick={() => onSelectCategory(cat.value)}
        >
          <span className="cat-emoji">{cat.emoji}</span>
          {cat.label}
        </button>
      ))}

      <hr className="sidebar-divider" />

      {/* Account */}
      <p className="sidebar-section-title">Account</p>
      {user ? (
        <>
          <Link to="/profile" className="sidebar-item">
            <span className="cat-emoji">👤</span>
            My Profile
          </Link>
          <button className="sidebar-item" onClick={handleLogout}>
            <span className="cat-emoji">🚪</span>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="sidebar-item">
            <span className="cat-emoji">🔑</span>
            Login
          </Link>
          <Link to="/register" className="sidebar-item">
            <span className="cat-emoji">📝</span>
            Sign Up
          </Link>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
