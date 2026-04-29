// // src/pages/MyCases.jsx
// import { useState } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import { useCases } from "../hooks/Usecases";
// import CaseModal from "../components/CaseModal";

// const CATEGORY_COLORS = {
//   Criminal:"#3b5bdb", Civil:"#2f9e44", Family:"#e67700",
//   Corporate:"#7048e8", Property:"#1098ad", Tax:"#c2255c",
//   Constitutional:"#c92a2a", Labor:"#5c7cfa",
// };

// export default function MyCases() {
//   const navigate = useNavigate();
//   const ctx = useOutletContext();
//   const search = ctx?.search || "";
//   const { cases, loading, updateCase, deleteCase, markDone } = useCases();
//   const [modal, setModal] = useState(null);
//   const [filter, setFilter] = useState("All");

//   const FILTERS = ["All", "Criminal", "Civil", "Family", "Corporate", "Property"];

//   const filtered = cases
//     .filter((c) => !c.done)
//     .filter((c) => filter === "All" || c.category === filter)
//     .filter((c) =>
//       !search ||
//       c.title?.toLowerCase().includes(search.toLowerCase()) ||
//       c.category?.toLowerCase().includes(search.toLowerCase())
//     );

//   const openModal = (c, action) => {
//     if (action === "delete") { if (window.confirm("Delete this case?")) deleteCase(c.id); return; }
//     setModal({ mode: action === "edit" ? "edit" : "view", data: c });
//   };

//   const handleModalSave = async (formOrAction) => {
//     if (formOrAction === "edit_mode") { setModal((p) => ({ ...p, mode: "edit" })); return; }
//     await updateCase(modal.data.id, formOrAction);
//     setModal(null);
//   };

//   return (
//     <div className="page">
//       {/* Breadcrumb */}
//       <div className="breadcrumb">Dashboard › My Cases</div>

//       <div className="page-header">
//         <h1 className="page-title">My Cases</h1>
//         <button className="btn btn--primary" onClick={() => navigate("/cases/add")}>+ Add Case</button>
//       </div>

//       {/* Filters */}
//       <div className="filter-tabs">
//         {FILTERS.map((f) => (
//           <button
//             key={f}
//             className={`filter-tab ${filter === f ? "filter-tab--active" : ""}`}
//             onClick={() => setFilter(f)}
//           >
//             {f}
//           </button>
//         ))}
//       </div>

//       {/* Cases list */}
//       {loading ? (
//         <div className="loading-state">Loading cases…</div>
//       ) : filtered.length === 0 ? (
//         <div className="empty-state">
//           <div className="empty-icon">📁</div>
//           <p>No cases found.</p>
//         </div>
//       ) : (
//         <div className="cases-list">
//           {filtered.map((c) => (
//             <CaseRow key={c.id} c={c} onView={() => openModal(c)} onEdit={() => openModal(c, "edit")} onDelete={() => openModal(c, "delete")} onDone={() => { markDone(c.id, true); }} />
//           ))}
//         </div>
//       )}

//       {modal && (
//         <CaseModal
//           mode={modal.mode}
//           caseData={modal.data}
//           onClose={() => setModal(null)}
//           onSave={handleModalSave}
//           onDelete={(id) => { deleteCase(id); setModal(null); }}
//           onMarkDone={(id, done) => { markDone(id, done); setModal(null); }}
//         />
//       )}
//     </div>
//   );
// }

// function CaseRow({ c, onView, onEdit, onDelete, onDone }) {
//   const color = CATEGORY_COLORS[c.category] || "#1a56db";
//   return (
//     <div className="case-row">
//       <div className="case-row-avatar" style={{ background: color }}>
//         {c.title?.charAt(0) || "C"}
//       </div>
//       <div className="case-row-body" onClick={onView}>
//         <div className="case-row-title">{c.title}</div>
//         <div className="case-row-meta">
//           {c.category} Case · Case No. {c.id?.slice(0, 12).toUpperCase()}
//         </div>
//         <div className="case-row-sub">
//           Next Hearing: <strong>{c.nextHearing || "TBD"}</strong>
//         </div>
//       </div>
//       <span className="status-badge status-badge--active">Active</span>
//       <div className="case-row-actions">
//         <button className="icon-btn" title="View"   onClick={onView}>👁</button>
//         <button className="icon-btn" title="Edit"   onClick={onEdit}>✏️</button>
//         <button className="icon-btn" title="Delete" onClick={onDelete}>🗑</button>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import { useCases } from "../hooks/Usecases"; 
// import CaseModal from "../components/CaseModal";

// const CATEGORY_COLORS = {
//   Criminal: "#3b5bdb",
//   Civil: "#2f9e44",
//   Family: "#e67700",
//   Corporate: "#7048e8",
//   Property: "#1098ad",
//   Tax: "#c2255c",
//   Constitutional: "#c92a2a",
//   Labor: "#5c7cfa",
// };

// export default function MyCases() {
//   const navigate = useNavigate();
//   const ctx = useOutletContext();
//   const search = ctx?.search || "";
  
//   // Destructure hook
//   const { cases, loading, updateCase, deleteCase, markDone } = useCases();
  
//   const [modal, setModal] = useState(null);
//   const [filter, setFilter] = useState("All");

//   const FILTERS = ["All", "Criminal", "Civil", "Family", "Corporate", "Property" , "Tax" , "Constitutional" , "Labor"];

//   // Filtering Logic
//   const filtered = cases
//     .filter((c) => !c.done)
//     .filter((c) => filter === "All" || c.category === filter)
//     .filter((c) =>
//       !search ||
//       c.title?.toLowerCase().includes(search.toLowerCase()) ||
//       c.category?.toLowerCase().includes(search.toLowerCase())
//     );

//   const openModal = (c, action) => {
//     if (action === "delete") {
//       if (window.confirm("Are you sure you want to delete this case?")) {
//         deleteCase(c.id);
//       }
//       return;
//     }
//     setModal({ mode: action === "edit" ? "edit" : "view", data: c });
//   };

//   const handleModalSave = async (formOrAction) => {
//     if (formOrAction === "edit_mode") {
//       setModal((p) => ({ ...p, mode: "edit" }));
//       return;
//     }
//     try {
//       await updateCase(modal.data.id, formOrAction);
//       setModal(null);
//     } catch (err) {
//       alert("Failed to update case");
//     }
//   };
  

//   return (
//     <div className="page">
//       <div className="breadcrumb">Dashboard › My Cases</div>

//       <div className="page-header">
//         <h1 className="page-title">My Cases</h1>
//         <button className="btn btn--primary" onClick={() => navigate("/cases/add")}>
//           + Add Case
//         </button>
//       </div>

//       <div className="filter-tabs">
//         {FILTERS.map((f) => (
//           <button
//             key={f}
//             className={`filter-tab ${filter === f ? "filter-tab--active" : ""}`}
//             onClick={() => setFilter(f)}
//           >
//             {f}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <div className="loading-state">Loading cases...</div>
//       ) : filtered.length === 0 ? (
//         <div className="empty-state">
//           <div className="empty-icon">📁</div>
//           <p>{cases.length === 0 ? "No cases found in your database." : "No cases match your filter."}</p>
//           {cases.length === 0 && (
//             <button className="btn btn--outline" onClick={() => navigate("/cases/add")}>
//               Create Your First Case
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="cases-list">
//           {filtered.map((c) => (
//             <CaseRow
//               key={c.id}
//               c={c}
//               onView={() => openModal(c, "view")}
//               onEdit={() => openModal(c, "edit")}
//               onDelete={() => openModal(c, "delete")}
//               onDone={() => markDone(c.id, true)}
//             />
//           ))}
//         </div>
//       )}

//       {modal && (
//         <CaseModal
//           mode={modal.mode}
//           caseData={modal.data}
//           onClose={() => setModal(null)}
//           onSave={handleModalSave}
//           onDelete={(id) => {
//             deleteCase(id);
//             setModal(null);
//           }}
//           onMarkDone={(id, done) => {
//             markDone(id, done);
//             setModal(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// function CaseRow({ c, onView, onEdit, onDelete, onDone }) {
//   const color = CATEGORY_COLORS[c.category] || "#1a56db";
  
//   return (
//     <div className="case-row">
//       <div className="case-row-avatar" style={{ background: color }}>
//         {c.title?.charAt(0).toUpperCase() || "C"}
//       </div>
//       <div className="case-row-body" onClick={onView}>
//         <div className="case-row-title">{c.title || "Untitled Case"}</div>
//         <div className="case-row-meta">
//           {c.category || "General"} Case · ID: {c.id?.slice(-6).toUpperCase()}
//         </div>
//         <div className="case-row-sub">
//           Next Hearing: <strong>{c.nextHearingDate || "Not Scheduled"}</strong>
//         </div>
//       </div>
//       <span className="status-badge status-badge--active">Active</span>
//       <div className="case-row-actions">
//         <button className="icon-btn" title="View" onClick={onView}>👁</button>
//         <button className="icon-btn" title="Edit" onClick={onEdit}>✏️</button>
//         <button className="icon-btn" title="Mark Done" onClick={onDone}>✅</button>
//         <button className="icon-btn" title="Delete" onClick={onDelete}>🗑</button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { useCases } from "../hooks/Usecases"; 
import CaseModal from "../components/CaseModal";

const CATEGORY_COLORS = {
  Criminal: "#3b5bdb",
  Civil: "#2f9e44",
  Family: "#e67700",
  Corporate: "#7048e8",
  Property: "#1098ad",
  Tax: "#c2255c",
  Constitutional: "#c92a2a",
  Labor: "#5c7cfa",
};

export default function MyCases() {
  const navigate = useNavigate();
  
  // Use searchQuery from AuthContext instead of OutletContext
  const { searchQuery } = useAuth(); 
  
  const { cases, loading, updateCase, deleteCase, markDone } = useCases();
  
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("All");

  const FILTERS = ["All", "Criminal", "Civil", "Family", "Corporate", "Property", "Tax", "Constitutional", "Labor"];

  // --- Filtering Logic ---
  const filtered = cases
    .filter((c) => !c.done)
    .filter((c) => filter === "All" || c.category === filter)
    .filter((c) => {
      // If no search query, show all
      if (!searchQuery) return true;
      
      const term = searchQuery.toLowerCase();
      return (
        c.title?.toLowerCase().includes(term) ||
        c.category?.toLowerCase().includes(term) ||
        c.id?.toLowerCase().includes(term)
      );
    });

  const openModal = (c, action) => {
    if (action === "delete") {
      if (window.confirm("Are you sure you want to delete this case?")) {
        deleteCase(c.id);
      }
      return;
    }
    setModal({ mode: action === "edit" ? "edit" : "view", data: c });
  };

  const handleModalSave = async (formOrAction) => {
    if (formOrAction === "edit_mode") {
      setModal((p) => ({ ...p, mode: "edit" }));
      return;
    }
    try {
      await updateCase(modal.data.id, formOrAction);
      setModal(null);
    } catch (err) {
      alert("Failed to update case");
    }
  };

  return (
    <div className="page">
      <div className="breadcrumb">Dashboard › My Cases</div>

      <div className="page-header">
        <h1 className="page-title">My Cases</h1>
        <button className="btn btn--primary" onClick={() => navigate("/cases/add")}>
          + Add Case
        </button>
      </div>

      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? "filter-tab--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state">Loading cases...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <p>
            {searchQuery 
              ? `No results found for "${searchQuery}"` 
              : cases.length === 0 
                ? "No cases found in your database." 
                : "No cases match your filter."}
          </p>
          {!searchQuery && cases.length === 0 && (
            <button className="btn btn--outline" onClick={() => navigate("/cases/add")}>
              Create Your First Case
            </button>
          )}
        </div>
      ) : (
        <div className="cases-list">
          {filtered.map((c) => (
            <CaseRow
              key={c.id}
              c={c}
              onView={() => openModal(c, "view")}
              onEdit={() => openModal(c, "edit")}
              onDelete={() => openModal(c, "delete")}
              onDone={() => markDone(c.id, true)}
            />
          ))}
        </div>
      )}

      {modal && (
        <CaseModal
          mode={modal.mode}
          caseData={modal.data}
          onClose={() => setModal(null)}
          onSave={handleModalSave}
          onDelete={(id) => {
            deleteCase(id);
            setModal(null);
          }}
          onMarkDone={(id, done) => {
            markDone(id, done);
            setModal(null);
          }}
        />
      )}
    </div>
  );
}

function CaseRow({ c, onView, onEdit, onDelete, onDone }) {
  const color = CATEGORY_COLORS[c.category] || "#1a56db";
  
  return (
    <div className="case-row">
      <div className="case-row-avatar" style={{ background: color }}>
        {c.title?.charAt(0).toUpperCase() || "C"}
      </div>
      <div className="case-row-body" onClick={onView}>
        <div className="case-row-title">{c.title || "Untitled Case"}</div>
        <div className="case-row-meta">
          {c.category || "General"} Case · ID: {c.id?.slice(-6).toUpperCase()}
        </div>
        <div className="case-row-sub">
          Next Hearing: <strong>{c.nextHearingDate || "Not Scheduled"}</strong>
        </div>
      </div>
      <span className="status-badge status-badge--active">Active</span>
      <div className="case-row-actions">
        <button className="icon-btn" title="View" onClick={onView}>👁</button>
        <button className="icon-btn" title="Edit" onClick={onEdit}>✏️</button>
        <button className="icon-btn" title="Mark Done" onClick={onDone}>✅</button>
        <button className="icon-btn" title="Delete" onClick={onDelete}>🗑</button>
      </div>
    </div>
  );
}