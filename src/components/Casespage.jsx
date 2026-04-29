import React, { useState } from 'react';
import './CasesPage.css';

const CasesPage = ({ cases, title, filter, onViewCase, onEditCase, onDeleteCase, onAddCase }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = cases
    .filter(c => filter ? c.status === filter : true)
    .filter(c => typeFilter === 'All' || c.type === typeFilter)
    .filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.caseNo.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase())
    );

  const types = ['All', ...new Set(cases.map(c => c.type))];

  return (
    <div className="cases-page">
      <div className="cases-page-header">
        <div>
          <h1>{title}</h1>
          <p>{filtered.length} case{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        {filter !== 'Done' && (
          <button className="add-case-btn" onClick={onAddCase}>
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
            </svg>
            Add New Case
          </button>
        )}
      </div>

      <div className="cases-filters">
        <div className="cases-search-box">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" className="search-icon-sm">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search cases, clients..."
          />
          {search && <button onClick={() => setSearch('')} className="clear-btn">✕</button>}
        </div>
        <div className="type-filters">
          {types.map(t => (
            <button
              key={t}
              className={`type-filter-btn ${typeFilter === t ? 'active' : ''}`}
              onClick={() => setTypeFilter(t)}
            >{t}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
            <circle cx="32" cy="32" r="28" stroke="#dde2ec" strokeWidth="2"/>
            <path d="M22 32h20M32 22v20" stroke="#dde2ec" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p>No cases found</p>
          {filter !== 'Done' && <button className="add-case-btn" onClick={onAddCase}>Add a Case</button>}
        </div>
      ) : (
        <div className="cases-table-wrap">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Case No.</th>
                <th>Type</th>
                <th>Client</th>
                <th>Next Hearing</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="table-case-name">
                      <div className="case-dot" style={{ background: c.color }}></div>
                      {c.title}
                    </div>
                  </td>
                  <td className="case-no-cell">{c.caseNo}</td>
                  <td><span className="type-chip">{c.type}</span></td>
                  <td>{c.client}</td>
                  <td>{c.nextHearing}</td>
                  <td>
                    <span className={`badge badge-${c.status.toLowerCase()}`}>{c.status}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-btn" title="View" onClick={() => onViewCase(c)}>
                        <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                      </button>
                      <button className="icon-btn" title="Edit" onClick={() => onEditCase(c)}>
                        <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                        </svg>
                      </button>
                      <button className="icon-btn icon-btn-danger" title="Delete" onClick={() => onDeleteCase(c.id)}>
                        <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CasesPage;