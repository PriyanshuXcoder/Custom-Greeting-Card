import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import PremiumModal from "../components/PremiumModal";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const TemplateDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [customName, setCustomName] = useState(user?.name || "Your Name");
  const [fontSize, setFontSize] = useState(18);
  const [fontColor, setFontColor] = useState("#ffffff");

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=7c3aed&color=fff&size=200`;
  const profileSrc = user?.profileImage || defaultAvatar;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/templates/${id}`);
        const t = res.data;
        setTemplate(t);
        setFontSize(t.fontSize || 18);
        setFontColor(t.fontColor || "#ffffff");
        if (t.premium) setShowPremiumModal(true);
      } catch (err) {
        toast.error("Template not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    const tid = toast.loading("Generating image...");
    try {
      await new Promise((r) => setTimeout(r, 250));
      const canvas = await html2canvas(canvasRef.current, {
        useCORS: true,
        allowTaint: false,
        scale: 2,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `${template.title.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.dismiss(tid);
      toast.success("Image downloaded!");
    } catch (err) {
      toast.dismiss(tid);
      toast.error("Download failed. Try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    try {
      const canvas = await html2canvas(canvasRef.current, { useCORS: true, scale: 2, logging: false });
      canvas.toBlob(async (blob) => {
        if (navigator.share && blob) {
          const file = new File([blob], "wish.png", { type: "image/png" });
          await navigator.share({ title: template.title, files: [file] });
        } else {
          await navigator.clipboard.writeText("Check out WishCraft for beautiful greeting cards! 🎉");
          toast.success("Link copied to clipboard!");
        }
      });
    } catch (err) {
      toast.error("Share failed");
    }
  };

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar selectedCategory="All" onSelectCategory={() => {}} />
        <div className="main-content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "36px", animation: "spin 1s linear infinite" }}>⏳</div>
        </div>
      </div>
    );
  }

  if (!template) return null;

  return (
    <div className="app-layout">
      <Sidebar selectedCategory="All" onSelectCategory={() => navigate("/")} />

      <div className="main-content">
        <Topbar searchValue="" onSearchChange={() => {}} />

        <div className="page-body fade-in">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              color: "#6b7280",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "20px",
              padding: 0,
              fontFamily: "Inter, sans-serif",
            }}
          >
            ← Back to templates
          </button>

          {/* Title */}
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#1e1b4b",
              marginBottom: "20px",
            }}
          >
            {template.title}
          </h1>

          <div className="detail-layout">
            {/* LEFT: Preview */}
            <div>
              <div ref={canvasRef} className="preview-canvas-wrap">
                <img
                  src={template.imageUrl}
                  alt={template.title}
                  className="preview-bg"
                  crossOrigin="anonymous"
                />

                {/* Profile overlay */}
                <img
                  src={profileSrc}
                  alt="Your photo"
                  crossOrigin="anonymous"
                  style={{
                    position: "absolute",
                    top: template.profilePosition?.top || "12%",
                    left: template.profilePosition?.left || "50%",
                    width: template.profilePosition?.size || "90px",
                    height: template.profilePosition?.size || "90px",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 3px 14px rgba(0,0,0,0.3)",
                  }}
                  onError={(e) => { e.target.src = defaultAvatar; }}
                />

                {/* Name overlay */}
                <span
                  style={{
                    position: "absolute",
                    top: template.namePosition?.top || "60%",
                    left: template.namePosition?.left || "50%",
                    transform: "translateX(-50%)",
                    fontSize: `${fontSize}px`,
                    color: fontColor,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    textShadow: "0 1px 6px rgba(0,0,0,0.7)",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.02em",
                  }}
                >
                  {customName}
                </span>
              </div>

              {/* Action buttons */}
              <div className="action-buttons">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="btn-download"
                >
                  {downloading ? "⏳ Please wait..." : "⬇ Download PNG"}
                </button>
                <button onClick={handleShare} className="btn-share">
                  🔗 Share
                </button>
              </div>
            </div>

            {/* RIGHT: Controls */}
            <div className="controls-panel">
              <h3>✏️ Customize</h3>

              <div className="control-group">
                <label>Display Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Your name on the card"
                />
              </div>

              <div className="control-group">
                <label>Font Size: {fontSize}px</label>
                <input
                  type="range"
                  min="12"
                  max="38"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                />
              </div>

              <div className="control-group">
                <label>Text Color</label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    style={{ width: "40px", height: "36px", padding: "2px", cursor: "pointer", borderRadius: "6px", border: "1px solid #e5e7eb" }}
                  />
                  <span style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "monospace" }}>
                    {fontColor}
                  </span>
                </div>
              </div>

              {/* Template meta */}
              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "16px",
                  borderTop: "1px solid #f3f4f6",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                  Category:{" "}
                  <span style={{ color: "#374151", fontWeight: 500 }}>{template.category}</span>
                </p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                  Type:{" "}
                  <span style={{ color: template.premium ? "#d97706" : "#059669", fontWeight: 600 }}>
                    {template.premium ? "⭐ Premium" : "✅ Free"}
                  </span>
                </p>
              </div>

              {/* Profile photo tip */}
              {!user?.profileImage && (
                <div
                  style={{
                    marginTop: "16px",
                    background: "#fef3c7",
                    border: "1px solid #fde68a",
                    borderRadius: "10px",
                    padding: "12px 14px",
                  }}
                >
                  <p style={{ fontSize: "12.5px", color: "#92400e" }}>
                    💡 <strong>Tip:</strong> Upload your profile photo to see it on the card!
                  </p>
                  <a
                    href="/profile"
                    style={{ fontSize: "12px", color: "#d97706", fontWeight: 600, textDecoration: "none", display: "block", marginTop: "4px" }}
                  >
                    Upload photo →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPremiumModal && (
        <PremiumModal onClose={() => { setShowPremiumModal(false); navigate("/"); }} />
      )}
    </div>
  );
};

export default TemplateDetail;
