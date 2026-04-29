// src/pages/AddCase.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCases } from "../hooks/Usecases";

const CATEGORIES = ["Criminal", "Civil", "Family", "Corporate", "Property", "Tax", "Constitutional", "Labor"];
const TYPES = ["Hearing", "Trial", "Appeal", "Arbitration", "Mediation", "Petition", "Other"];
const COURTS = [
  "Supreme Court of Pakistan", "Sindh High Court", "Lahore High Court",
  "Islamabad High Court", "Peshawar High Court", "Balochistan High Court",
  "District Court Karachi", "District Court Lahore", "Federal Shariat Court", "Other",
];

export default function AddCase() {
  const navigate = useNavigate();
  const { addCase } = useCases();

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
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category) {
      setError("Case title and category are required.");
      return;
    }
    setSaving(true);
    try {
      await addCase(form);
      navigate("/cases");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="breadcrumb">Dashboard › Add New Case</div>
      <h1 className="page-title">Add New Case</h1>

      <form className="add-case-form" onSubmit={handleSubmit}>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Case Title <span className="req">*</span></label>
            <input 
              className="form-input" 
              placeholder="e.g. State vs. John Doe" 
              value={form.title} 
              onChange={f("title")} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Case Number (Manual)</label>
            <input 
              className="form-input" 
              placeholder="e.g. 2024-CR-102" 
              value={form.caseNo} 
              onChange={f("caseNo")} 
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Case Category <span className="req">*</span></label>
            <select className="form-select" value={form.category} onChange={f("category")}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Case Type</label>
            <select className="form-select" value={form.caseType} onChange={f("caseType")}>
              <option value="">Select type</option>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Evidence / Witness Details</label>
          <textarea
            className="form-textarea"
            rows={3}
            placeholder="Enter witness names, statements, exhibit numbers, etc."
            value={form.evidenceDetails}
            onChange={f("evidenceDetails")}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Case Description</label>
          <textarea 
            className="form-textarea" 
            rows={4} 
            placeholder="Enter case description..." 
            value={form.description} 
            onChange={f("description")} 
          />
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
            <label className="form-label">Filing Date</label>
            <input className="form-input" type="date" value={form.filingDate} onChange={f("filingDate")} />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Next Hearing Date</label>
            <input className="form-input" type="date" value={form.nextHearing} onChange={f("nextHearing")} />
          </div>
          <div className="form-group">
            <label className="form-label">Assigned To</label>
            <input 
              className="form-input" 
              placeholder="e.g. John Doe (Lawyer)" 
              value={form.assignedTo} 
              onChange={f("assignedTo")} 
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <div className="radio-group">
            {["Active", "Done"].map((s) => (
              <label key={s} className="radio-label">
                <input 
                  type="radio" 
                  name="status" 
                  value={s} 
                  checked={form.status === s} 
                  onChange={f("status")} 
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button type="button" className="btn btn--ghost" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save Case"}
          </button>
        </div>
      </form>
    </div>
  );
}