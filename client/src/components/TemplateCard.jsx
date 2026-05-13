import { useAuth } from "../context/AuthContext";

/**
 * TemplateCard - shows a live preview of the greeting card
 * with the user's profile photo and name overlaid at positions
 * defined per-template in the database.
 */
const TemplateCard = ({ template, onClick }) => {
  const { user } = useAuth();

  const displayName = user?.name || "Your Name";
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=7c3aed&color=fff&size=120`;
  const profileSrc = user?.profileImage || defaultAvatar;

  return (
    <div className="tpl-card" onClick={() => onClick(template)}>
      <div className="tpl-card-canvas">
        {/* Background template image */}
        <img
          src={template.imageUrl}
          alt={template.title}
          className="tpl-bg"
          loading="lazy"
        />

        {/* Premium blur overlay */}
        {template.premium && (
          <div className="premium-lock">
            <span className="lock-icon">🔒</span>
            <span className="badge badge-premium" style={{ position: "static", marginTop: "2px" }}>
              PREMIUM
            </span>
          </div>
        )}

        {/* Live profile photo overlay */}
        {!template.premium && (
          <img
            src={profileSrc}
            alt="your photo"
            className="tpl-overlay-profile"
            style={{
              top: template.profilePosition?.top || "12%",
              left: template.profilePosition?.left || "50%",
              width: template.profilePosition?.size || "72px",
              height: template.profilePosition?.size || "72px",
            }}
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
        )}

        {/* Live name overlay */}
        {!template.premium && (
          <span
            className="tpl-overlay-name"
            style={{
              top: template.namePosition?.top || "60%",
              left: template.namePosition?.left || "50%",
              fontSize: `${Math.max(template.fontSize - 4, 12)}px`,
              color: template.fontColor || "#ffffff",
            }}
          >
            {displayName}
          </span>
        )}

        {/* Badges */}
        {!template.premium && (
          <span className="badge badge-free">Free</span>
        )}
        {template.premium && !template.trending && (
          <span className="badge badge-premium">Premium</span>
        )}
        {template.trending && (
          <span className="badge badge-trending">🔥 Trending</span>
        )}
      </div>

      <div className="tpl-card-footer">
        <p className="tpl-title">{template.title}</p>
        <p className="tpl-category">{template.category}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
