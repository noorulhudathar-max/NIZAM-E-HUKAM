// src/pages/Calendar.jsx
import { useCases } from "../hooks/Usecases";

export default function Calendar() {
  const { cases } = useCases();
  const hearings = cases
    .filter((c) => c.nextHearing && !c.done)
    .sort((a, b) => new Date(a.nextHearing) - new Date(b.nextHearing));

  return (
    <div className="page">
      <div className="breadcrumb">Dashboard › Calendar</div>
      <h1 className="page-title">Upcoming Hearings</h1>
      {hearings.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">📅</div><p>No upcoming hearings scheduled.</p></div>
      ) : (
        <div className="cal-list">
          {hearings.map((c) => (
            <div key={c.id} className="cal-row">
              <div className="cal-date-box">
                <span className="cal-month">{new Date(c.nextHearing).toLocaleString("default",{month:"short"})}</span>
                <span className="cal-day">{new Date(c.nextHearing).getDate()}</span>
              </div>
              <div className="cal-body">
                <div className="cal-title">{c.title}</div>
                <div className="cal-meta">{c.category} · {c.courtName || "Court TBD"}</div>
              </div>
              <span className="status-badge status-badge--active">Upcoming</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}