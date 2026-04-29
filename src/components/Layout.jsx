
// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

// export default function Layout() {
//   const [search, setSearch] = useState("");

//   return (
//     <div className="app-layout">
//       {/* 1. Sidebar on the left */}
//       <Sidebar />
      
//       <div className="app-main">
//         {/* 2. Topbar at the top */}
//         <Topbar search={search} setSearch={setSearch} />
        
//         {/* 3. Main content area where pages like AddCase render */}
//         <div className="app-content">
//           <Outlet context={{ search }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/Layout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
 
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
 
  return (
    <div className="app-layout">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="app-main">
        <Topbar
          search={search}
          setSearch={setSearch}
          onMenuClick={() => setSidebarOpen((p) => !p)}
        />
        <div className="app-content">
          <Outlet context={{ search }} />
        </div>
      </div>
    </div>
  );
}
 