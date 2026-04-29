// // src/components/Topbar.jsx
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const TITLES = {
//   "/dashboard":     "Dashboard",
//   "/cases":         "My Cases",
//   "/cases/add":     "Add New Case",
//   "/cases/done":    "Done Cases",
//   "/calendar":      "Calendar",
//   "/notifications": "Notifications",
//   "/settings":      "Settings",
// };

// export default function Topbar({ search, setSearch }) {
//   const { pathname } = useLocation();
//   const { profile }  = useAuth();
//   const navigate     = useNavigate();

//   // match prefix for detail pages
//   const title = Object.entries(TITLES).find(([k]) => pathname.startsWith(k))?.[1] || "Dashboard";

//   return (
//     <header className="topbar">
//       {/* Hamburger (mobile) */}
//       <button className="topbar-menu" aria-label="menu">☰</button>

//       {/* Search */}
//       <div className="topbar-search">
//         <span className="topbar-search-icon">🔍</span>
//         <input
//           className="topbar-search-input"
//           placeholder="Search cases, laws, documents..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Right side */}
//       <div className="topbar-right">
//         {/* <button className="topbar-notif" onClick={() => navigate("/notifications")}> */}
        
//           {/* <span className="notif-badge">3</span>
//         </button> */}
//         <div className="topbar-user" onClick={() => navigate("/settings")}>
//           <div className="topbar-avatar">
//             {profile?.name?.charAt(0)?.toUpperCase() || "U"}
//           </div>
//           <div className="topbar-user-info">
//             <span className="topbar-user-name">{profile?.name || "User"}</span>
//             <span className="topbar-user-role">{profile?.category || "Member"}</span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
 
// export default function Topbar({ search, setSearch, onMenuClick }) {
//   const { profile = {} } = useAuth() ?? {};
//   const navigate = useNavigate();
//  const { searchQuery, setSearchQuery } = useAuth();

//   return (
//     <header className="topbar">
//       <button className="topbar-menu" aria-label="Open menu" onClick={onMenuClick}>☰</button>
//       <div className="topbar-search">
//         <span className="topbar-search-icon">🔍</span>
//         <input className="topbar-search-input" placeholder="Search cases, laws, documents..." value={search} onChange={(e) => setSearch(e.target.value)} />
//       </div>
//       <div className="topbar-right">

//         <div className="topbar-user" onClick={() => navigate("/settings")}>
//           <div className="topbar-avatar">{profile?.name?.charAt(0)?.toUpperCase() || "U"}</div>
//           <div className="topbar-user-info">
//             <span className="topbar-user-name">{profile?.name || "User"}</span>
//             <span className="topbar-user-role">{profile?.category || "Member"}</span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
 

import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useAuth } from "../context/AuthContext";


export default function Topbar({ onMenuClick }) {
  // const { profile = {}, searchQuery, setSearchQuery } = useAuth() ?? {};
  const navigate = useNavigate();
  const location = useLocation(); // Detect current page
  const { profile, searchQuery, setSearchQuery } = useAuth();
const showSearch = location.pathname === "/cases";
  // Define logic: Hide search if we are on the dashboard
  const isDashboard = location.pathname === "/dashboard" || location.pathname === "/";

  return (
    <header className="topbar">
      <button className="topbar-menu" aria-label="Open menu" onClick={onMenuClick}>☰</button>
      
{showSearch && (
        <div className="topbar-search">
          <span className="topbar-search-icon">🔍</span>
          <input 
            className="topbar-search-input" 
            placeholder="Search cases..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* {!isDashboard ? (
        <div className="topbar-search">
          <span className="topbar-search-icon">🔍</span>
          <input 
            className="topbar-search-input" 
            placeholder="Search cases, laws, documents..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      ) : (
        <div className="topbar-search-spacer" style={{ flex: 1 }}></div> 
      )} */}

      <div className="topbar-right">
        <div className="topbar-user" onClick={() => navigate("/settings")}>
          <div className="topbar-avatar">{profile?.name?.charAt(0)?.toUpperCase() || "U"}</div>
          <div className="topbar-user-info">
            <span className="topbar-user-name">{profile?.name || "User"}</span>
            <span className="topbar-user-role">{profile?.category || "Member"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}