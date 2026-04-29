import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { useCases } from "../hooks/Usecases";
import CaseModal from "../components/CaseModal";

export default function DoneCases() {

  const { searchQuery, setSearchQuery } = useAuth();
  
  const { cases, loading, updateCase, deleteCase, markDone } = useCases();
  const [modal, setModal] = useState(null);

  const done = cases
    .filter((c) => c.done)
    .filter((c) => {
      if (!searchQuery) return true;
      const term = searchQuery.toLowerCase();
      return (
        c.title?.toLowerCase().includes(term) ||
        c.category?.toLowerCase().includes(term) ||
        c.id?.toLowerCase().includes(term)
      );
    });

  const openModal = (c) => setModal({ mode: "view", data: c });

  const handleModalSave = async (formOrAction) => {
    if (formOrAction === "edit_mode") { 
      setModal((p) => ({ ...p, mode: "edit" })); 
      return; 
    }
    await updateCase(modal.data.id, formOrAction);
    setModal(null);
  };

  return (
    <div className="page">
      <div className="breadcrumb">Dashboard › Done Cases</div>
      <div className="page-header">
        <h1 className="page-title">Done Cases</h1>
      </div>

      {/* --- Interactive Search bar --- */}
      <div className="done-search-wrap">
        <span>🔍</span>
        <input 
          className="done-search" 
          placeholder="Search done cases..." 
          value={searchQuery} // Linked to AuthContext
          onChange={(e) => setSearchQuery(e.target.value)} // Now functional
        />
      </div>

      {loading ? (
        <div className="loading-state">Loading…</div>
      ) : done.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✅</div>
          <p>
            {searchQuery 
              ? `No results found for "${searchQuery}"` 
              : "No completed cases yet."}
          </p>
        </div>
      ) : (
        <div className="done-list">
          {done.map((c) => (
            <div key={c.id} className="done-row" onClick={() => openModal(c)}>
              <div className="done-row-check">✅</div>
              <div className="done-row-body">
                <div className="done-row-title">{c.title}</div>
                <div className="done-row-meta">{c.category} Case</div>
                <div className="done-row-sub">
                  Case No. {c.id?.slice(0, 12).toUpperCase()} · Completed on:{" "}
                  {c.updatedAt?.toDate
                    ? c.updatedAt.toDate().toLocaleDateString("en-GB", { day:"2-digit",month:"short",year:"numeric"})
                    : "—"}
                </div>
              </div>
              <span className="done-row-arrow">›</span>
            </div>
          ))}
        </div>
      )}

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