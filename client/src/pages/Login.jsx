import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      login(res.data, res.data.token);
      toast.success(`Welcome back, ${res.data.name}! 👋`);
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        email: "guest@wishcraft.com",
        password: "guest123",
      });
      login(res.data, res.data.token);
      toast.success("Logged in as Guest 👤");
      navigate("/");
    } catch (err) {
      toast.error("Guest login unavailable — please create a free account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Gradient header */}
        <div className="auth-card-header">
          <span className="auth-emoji">🎉</span>
          <h1>Welcome Back!</h1>
          <p>Login to continue to WishCraft</p>
        </div>

        {/* Form body */}
        <div className="auth-card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            onClick={handleGuestLogin}
            disabled={loading}
            className="btn-outline"
          >
            👤 Continue as Guest
          </button>

          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/register">Sign Up for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
