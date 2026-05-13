import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Topbar = ({ searchValue, onSearchChange }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const defaultAvatar = user
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff&size=68`
    : "";

  return (
    <header className="topbar">
      {/* Search */}
      <div className="topbar-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search templates..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Right side */}
      <div className="topbar-right">
        {user ? (
          <>
            <Link to="/profile" className="user-avatar-btn">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="user-avatar"
                />
              ) : (
                <img
                  src={defaultAvatar}
                  alt={user.name}
                  className="user-avatar"
                />
              )}
              <span className="user-name-text">{user.name.split(" ")[0]}</span>
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <Link
              to="/login"
              style={{
                fontSize: "13px",
                color: "#6b7280",
                textDecoration: "none",
                padding: "7px 14px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontWeight: "500",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                fontSize: "13px",
                color: "#fff",
                textDecoration: "none",
                padding: "7px 14px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                fontWeight: "600",
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
