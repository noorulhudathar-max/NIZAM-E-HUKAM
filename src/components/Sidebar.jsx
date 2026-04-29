// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/cases", label: "My Cases", icon: "📁" },
  { to: "/cases/add", label: "Add Case", icon: "➕" },
  { to: "/cases/done", label: "Done Cases", icon: "✅" },
  { to: "/calendar", label: "Calendar", icon: "📅" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${open ? "active" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>

        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">⚖️</div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-title">NIZAM E HUKAM</span>
          </div>
        </div>

        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            // Add "/cases" here to fix the double blue highlight
            end={n.to === "/dashboard" || n.to === "/cases"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "nav-item--active" : ""}`
            }
            onClick={handleNavClick}
          >
            <span className="nav-icon">{n.icon}</span>
            <span className="nav-label">{n.label}</span>
          </NavLink>
        ))}
        {/* Logout */}
        <button className="sidebar-logout" onClick={handleLogout}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}
