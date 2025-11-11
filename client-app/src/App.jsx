import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import StaffLayout from "./layouts/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import ManageCategories from "./pages/staff/ManageCategories";
import ManageNews from "./pages/staff/ManageNews";
import ManageAccount from "./pages/admin/ManageAccount";
import ManageProfile from "./pages/staff/ManageProfile";
function App() {
  const role = Number(localStorage.getItem("role"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {role === 3 && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<h1>Admin Dashboard</h1>} />
            <Route path="manage-accounts" element={<ManageAccount />} />
          </Route>
        )}

        {role === 1 && (
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<StaffDashboard />} />
            <Route path="categories" element={<ManageCategories />} />
            {<Route path="news" element={<ManageNews />} />}
            <Route path="profile" element={<ManageProfile />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
