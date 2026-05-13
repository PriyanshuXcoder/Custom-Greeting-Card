import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import TemplateCard from "../components/TemplateCard";
import PremiumModal from "../components/PremiumModal";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchTemplates = async (cat, q) => {
    setLoading(true);
    try {
      const params = {};
      if (cat && cat !== "All") params.category = cat;
      if (q?.trim()) params.search = q.trim();
      const res = await API.get("/templates", { params });
      setTemplates(res.data);
    } catch (err) {
      console.error("Fetch templates failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates(selectedCategory, search);
  }, [selectedCategory]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => fetchTemplates(selectedCategory, search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleTemplateClick = (template) => {
    if (template.premium) {
      setShowPremiumModal(true);
    } else {
      navigate(`/template/${template._id}`);
    }
  };

  const trending = templates.filter((t) => t.trending);

  return (
    <div className="app-layout">
      <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <div className="main-content">
        <Topbar searchValue={search} onSearchChange={setSearch} />

        <div className="page-body fade-in">
          {/* Hero Banner */}
          <div className="hero-banner">
            <h1>Create Beautiful Wishes 🎉</h1>
            <p>Personalize any card with your photo and name — free & instantly shareable</p>
            <div className="hero-emojis">🎂 🎊 💍</div>
          </div>

          {/* Login prompt */}
          {!user && (
            <div className="login-prompt">
              <p>🙌 Login to see your photo & name on every card!</p>
              <a href="/login">Login now →</a>
            </div>
          )}

          {loading ? (
            <div className="template-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: "240px" }} />
              ))}
            </div>
          ) : (
            <>
              {/* Trending section */}
              {trending.length > 0 && selectedCategory === "All" && !search && (
                <section style={{ marginBottom: "28px" }}>
                  <div className="section-heading">
                    <h2>🔥 Trending Now</h2>
                    <span className="count-badge">{trending.length} templates</span>
                  </div>
                  <div className="template-grid">
                    {trending.map((t) => (
                      <TemplateCard key={t._id} template={t} onClick={handleTemplateClick} />
                    ))}
                  </div>
                </section>
              )}

              {/* All / filtered templates */}
              <section>
                <div className="section-heading">
                  <h2>
                    {selectedCategory === "All" ? "All Templates" : selectedCategory}
                  </h2>
                  <span className="count-badge">{templates.length}</span>
                </div>

                {templates.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <p>No templates found. Try a different search or category.</p>
                  </div>
                ) : (
                  <div className="template-grid">
                    {templates.map((t) => (
                      <TemplateCard key={t._id} template={t} onClick={handleTemplateClick} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>

      {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
    </div>
  );
};

export default Home;
