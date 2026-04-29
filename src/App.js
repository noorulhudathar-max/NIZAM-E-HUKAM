import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

import Layout from "./components/Layout";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";

import MyCases from "./pages/MyCases";
import AddCase from "./pages/AddCase";
import DoneCases from "./pages/DoneCases";
import Calendar from "./pages/Calendar";

import Settings from "./pages/Settings";
import ProtectedRoute from "./ProtectedRoute";
function LoadingScreen() {
  return <div>Loading...</div>;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
      /> */}
      {/* <Route
  path="/login"
  element={
    !user || sessionStorage.getItem("justSignedUp")
      ? <Login />
      : <Navigate to="/dashboard" replace />
  }
/> */}
<Route
  path="/login"
  element={
    !user || sessionStorage.getItem("blockRedirect")
      ? <Login />
      : <Navigate to="/dashboard" replace />
  }
/>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cases" element={<MyCases />} />
        <Route path="cases/add" element={<AddCase />} />
        <Route path="cases/done" element={<DoneCases />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
