import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🎉</span>
          <span className="font-bold text-lg text-indigo-600" style={{ fontFamily: "Poppins, sans-serif" }}>
            WishCraft
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">
            Templates
          </Link>
          {user && (
            <Link to="/profile" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">
              Profile
            </Link>
          )}
        </div>

        {/* Auth section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-indigo-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-gray-700 hidden md:block">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors px-2 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
