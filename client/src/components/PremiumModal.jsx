const PremiumModal = ({ onClose }) => {
  const handleSubscribe = () => {
    alert("🎉 In a real app, this would open Razorpay payment. For now, it's a demo!");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>⭐</div>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px", fontWeight: 700 }}>
            Upgrade to Premium
          </h2>
          <p style={{ fontSize: "13px", opacity: 0.9, marginTop: "4px" }}>
            Unlock all premium templates instantly
          </p>
        </div>

        {/* Body */}
        <div className="modal-body">
          <ul style={{ listStyle: "none", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              ["✅", "Access 50+ premium templates"],
              ["✅", "HD quality image downloads"],
              ["✅", "No watermark on exports"],
              ["✅", "New templates added weekly"],
              ["✅", "Priority support"],
            ].map(([icon, text]) => (
              <li key={text} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#374151" }}>
                <span>{icon}</span> {text}
              </li>
            ))}
          </ul>

          {/* Price */}
          <div
            style={{
              background: "linear-gradient(135deg, #fef3c7, #fde68a)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
              marginBottom: "16px",
              border: "1px solid #fcd34d",
            }}
          >
            <p style={{ fontSize: "11px", color: "#92400e", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Special Launch Offer
            </p>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "30px", fontWeight: 800, color: "#92400e", margin: "4px 0" }}>
              ₹99<span style={{ fontSize: "14px", fontWeight: 400, color: "#a16207" }}>/month</span>
            </p>
            <p style={{ fontSize: "11px", color: "#a16207" }}>Cancel anytime • No hidden charges</p>
          </div>

          <button
            onClick={handleSubscribe}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Get Premium Now 🚀
          </button>

          <button
            onClick={onClose}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              color: "#9ca3af",
              fontSize: "13px",
              marginTop: "10px",
              cursor: "pointer",
              padding: "6px",
            }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
