import { useState, useEffect } from "react";
const CATEGORIES = ["Criminal", "Civil", "Family", "Corporate", "Property", "Tax", "Constitutional", "Labor"];
const COURTS = [
  "Supreme Court of Pakistan",
  "Sindh High Court",
  "Lahore High Court",
  "Islamabad High Court",
  "Peshawar High Court",
  "Balochistan High Court",
  "District Court Karachi",
  "District Court Lahore",
  "Federal Shariat Court",
  "Other",
];

export default function CaseModal({ mode, caseData, onClose, onSave, onDelete, onMarkDone }) {
  const isView = mode === "view";
  const isAdd = mode === "add";

  const [form, setForm] = useState({
    title: "",
    caseNo: "", 
    category: "",
    caseType: "",
    description: "",
    evidenceDetails: "", 
    courtName: "",
    filingDate: "",
    nextHearing: "",
    assignedTo: "",
    status: "Active",
    done: false,
    ...(caseData || {}),
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = async () => {
    if (!form.title || !form.category) return;
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDel) {
      setConfirmDel(true);
      return;
    }
    setDeleting(true);
    try {
      await onDelete(caseData.id);
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  const handleMarkDone = async () => {
    await onMarkDone(caseData.id, !caseData.done);
    onClose();
  };

  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {isAdd ? "Add New Case" : isView ? "Case Details" : "Edit Case"}
            </h2>
            {!isAdd && caseData && (
              <div className="modal-breadcrumb">
                Dashboard › My Cases › {isView ? "Case Details" : "Edit Case"}
              </div>
            )}
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {isView && caseData && (
            <div className="case-hero">
              <div className="case-hero-avatar" style={{ background: categoryColor(caseData.category) }}>
                {caseData.title?.charAt(0) || "C"}
              </div>
              <div>
                <div className="case-hero-title">{caseData.title}</div>
                <div className="case-hero-sub">
                  {caseData.category} Case | Case No. {caseData.caseNo || "N/A"}
                </div>
              </div>
              <span className={`status-badge status-badge--${caseData.done ? "done" : "active"}`}>
                {caseData.done ? "Done" : "Active"}
              </span>
            </div>
          )}

          {isView && caseData ? (
            <div className="case-details-grid">
              <div className="detail-row">
                <span className="detail-label">Case Number</span>
                <span className="detail-value">{caseData.caseNo || "—"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Category</span>
                <span className="detail-value">{caseData.category}</span>
              </div>
              <div className="detail-row detail-row--full">
                <span className="detail-label">Evidence / Witness</span>
                <span className="detail-value" style={{ whiteSpace: 'pre-wrap' }}>
                  {caseData.evidenceDetails || "—"}
                </span>
              </div>
              <div className="detail-row detail-row--full">
                <span className="detail-label">Description</span>
                <span className="detail-value" style={{ whiteSpace: 'pre-wrap' }}>
                  {caseData.description || "—"}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Court Name</span>
                <span className="detail-value">{caseData.courtName || "—"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Next Hearing</span>
                <span className="detail-value">{caseData.nextHearing || "—"}</span>
              </div>
            </div>
          ) : (
            <div className="case-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Case Title <span className="req">*</span></label>
                  <input className="form-input" placeholder="Case Title" value={form.title} onChange={f("title")} />
                </div>
                <div className="form-group">
                  <label className="form-label">Case Number (Manual)</label>
                  <input className="form-input" placeholder="Enter Case ID/No." value={form.caseNo} onChange={f("caseNo")} />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Category <span className="req">*</span></label>
                  <select className="form-select" value={form.category} onChange={f("category")}>
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {/* FIXED: Changed from input to textarea for scrollability and editing */}
                <div className="form-group">
                  <label className="form-label">Evidence / Witness</label>
                  <textarea 
                    className="form-textarea" 
                    rows="2" 
                    placeholder="Witness names/details" 
                    value={form.evidenceDetails} 
                    onChange={f("evidenceDetails")} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows={4} placeholder="Description..." value={form.description} onChange={f("description")} />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Court Name</label>
                  <select className="form-select" value={form.courtName} onChange={f("courtName")}>
                    <option value="">Select court</option>
                    {COURTS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Next Hearing</label>
                  <input className="form-input" type="date" value={form.nextHearing} onChange={f("nextHearing")} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {isView ? (
            <>
              <button className="btn btn--outline" onClick={handleMarkDone}>
                {caseData?.done ? "↩ Reopen" : "✓ Mark as Done"}
              </button>
              <button className="btn btn--primary" onClick={() => onSave("edit_mode")}>Edit Case</button>
<button className="btn btn--danger" onClick={handleDelete} disabled={deleting}>
  {deleting ? "Deleting…" : confirmDel ? "Confirm?" : "Delete Case"}
</button>
            </>
          ) : (
            <>
              <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
              <button className="btn btn--primary" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function categoryColor(cat) {
  const map = { Criminal: "#3b5bdb", Civil: "#2f9e44", Family: "#e67700", Corporate: "#7048e8", Property: "#1098ad", Tax: "#c2255c", Constitutional: "#c92a2a", Labor: "#5c7cfa" };
  return map[cat] || "#1a56db";
}