import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCases } from "../hooks/Usecases";
import CaseModal from "../components/CaseModal";

const CATEGORY_COLORS = {
  Criminal: "#3b5bdb", Civil: "#2f9e44", Family: "#e67700",
  Corporate: "#7048e8", Property: "#1098ad", Tax: "#c2255c",
  Constitutional: "#c92a2a", Labor: "#5c7cfa",
};

const StatCard = ({ icon, iconBg, value, label, onViewAll }) => (
  <div className="stat-card">
    <div className="stat-card-icon" style={{ background: iconBg }}>{icon}</div>
    <div className="stat-card-body">
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
      <button className="stat-card-link" onClick={onViewAll}>View all</button>
    </div>
  </div>
);

const RecentCaseCard = ({ c, onClick }) => {
  const color = CATEGORY_COLORS[c.category] || "#1a56db";
  return (
    <div className="recent-card" onClick={() => onClick(c)}>
      <div className="recent-card-avatar" style={{ background: color }}>
        {c.title?.charAt(0) || "C"}
      </div>
      <div className="recent-card-body">
        <div className="recent-card-title">{c.title}</div>
        <div className="recent-card-cat">{c.category} Case</div>
        <div className="recent-card-meta">Case No. {c.id?.slice(0, 12).toUpperCase()}</div>
        <div className="recent-card-hearing">Next Hearing: {c.nextHearing || "TBD"}</div>
        <span className="status-badge status-badge--active">Active</span>
      </div>
      <div className="recent-card-actions">
        <button onClick={(e) => { e.stopPropagation(); onClick(c); }}>👁</button>
        <button onClick={(e) => { e.stopPropagation(); onClick(c, "edit"); }}>✏️</button>
        <button onClick={(e) => { e.stopPropagation(); onClick(c, "delete"); }}>🗑</button>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { cases, loading, updateCase, deleteCase, markDone } = useCases();
  const [modal, setModal] = useState(null);

  const stats = useMemo(() => ({
    active: cases.filter(c => !c.done),
    done: cases.filter(c => c.done),
    upcoming: cases.filter(c => c.nextHearing && !c.done)
  }), [cases]);

  const openModal = (c, action) => {
    if (action === "delete") return deleteCase(c.id);
    setModal({ mode: action === "edit" ? "edit" : "view", data: c });
  };

  const handleModalSave = async (formOrAction) => {
    if (formOrAction === "edit_mode") return setModal(p => ({ ...p, mode: "edit" }));
    await updateCase(modal.data.id, formOrAction);
    setModal(null);
  };

  return (
    <div className="page-dashboard">
      <header className="dashboard-welcome">
        <div>
          <h1 className="dashboard-welcome-title">
            Welcome back, {profile?.name?.split(" ")[0] || "User"}! 👋
          </h1>
          <p className="dashboard-welcome-sub">Here's what's happening with your cases today.</p>
        </div>
        <button className="btn btn--primary btn--lg" onClick={() => navigate("/cases/add")}>
          + Add New Case
        </button>
      </header>

      <section className="stat-cards-grid">
        <StatCard icon="📁" iconBg="#dbeafe" value={stats.active.length} label="Active Cases" onViewAll={() => navigate("/cases")} />
        <StatCard icon="✅" iconBg="#dcfce7" value={stats.done.length} label="Done Cases" onViewAll={() => navigate("/cases/done")} />
        <StatCard icon="📋" iconBg="#e0e7ff" value={cases.length} label="Total Cases" onViewAll={() => navigate("/cases")} />
        <StatCard icon="📅" iconBg="#fef9c3" value={stats.upcoming.length} label="Upcoming Hearings" onViewAll={() => navigate("/calendar")} />
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">Recent Cases</h2>
          <button className="link-text" onClick={() => navigate("/cases")}>View all cases →</button>
        </div>

        {loading ? (
          <div className="loading-state">Loading cases…</div>
        ) : stats.active.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <p>No active cases yet.</p>
            <button className="btn btn--primary" onClick={() => navigate("/cases/add")}>Add your first case</button>
          </div>
        ) : (
          <div className="recent-cases-grid">
            {stats.active.slice(0, 4).map(c => (
              <RecentCaseCard key={c.id} c={c} onClick={openModal} />
            ))}
          </div>
        )}
      </section>

      {modal && (
        <CaseModal
          mode={modal.mode}
          caseData={modal.data}
          onClose={() => setModal(null)}
          onSave={handleModalSave}
          onDelete={(id) => { deleteCase(id); setModal(null); }}
          onMarkDone={(id, done) => { markDone(id, done); setModal(null); }}
        />
      )}
    </div>
  );
}
