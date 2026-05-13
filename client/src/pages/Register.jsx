import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!form.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!form.password) {
      toast.error("Please enter a password");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      // login right after register
      login(res.data, res.data.token);
      toast.success("Account created! Welcome to WishCraft 🎉");
      navigate("/");
    } catch (err) {
      // show exact server error message so user knows what happened
      const msg =
        err.response?.data?.message ||
        (err.message === "Network Error"
          ? "Cannot connect to server. Make sure the backend is running."
          : "Registration failed. Please try again.");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Gradient header */}
        <div className="auth-card-header">
          <span className="auth-emoji">✨</span>
          <h1>Create Account</h1>
          <p>Join WishCraft and start creating beautiful wishes</p>
        </div>

        {/* Form body */}
        <div className="auth-card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Priya Sharma"
                className="form-input"
                autoComplete="name"
              />
            </div>

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
                placeholder="Minimum 6 characters"
                className="form-input"
                autoComplete="new-password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          {/* Network error help */}
          <div
            style={{
              background: "#fef3c7",
              border: "1px solid #fcd34d",
              borderRadius: "10px",
              padding: "10px 14px",
              marginTop: "16px",
              fontSize: "12px",
              color: "#92400e",
            }}
          >
            💡 <strong>Note:</strong> Make sure the backend server is running on port 5000.
            Run <code style={{ background: "#fde68a", padding: "1px 4px", borderRadius: "4px" }}>npm run dev</code> in the <code>server/</code> folder.
          </div>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
