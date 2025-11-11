import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import "./StaffDashboard.css";

export default function StaffDashboard() {
  // 2. Initialize the navigate function
  const navigate = useNavigate(); 
  
  const userRole = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.accountEmail;
  const userName = user?.accountName;

  // 3. Define the navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>👋 Welcome, {userName || "Staff"}!</h1>
        <p className="subtext">Manage your news content and categories efficiently.</p>
      </div>

      <div className="user-info">
        <p><strong>Role:</strong> {userRole === "1" ? "Staff" : "Admin"}</p>
        <p><strong>Email:</strong> {userEmail}</p>
      </div>

      <div className="cards-container">
        <div className="dashboard-card">
          <h3>📂 Manage Categories</h3>
          <p>Organize and update your news categories.</p>
          {/* 4. Use the handler with the target path */}
          <button onClick={() => handleNavigation("/staff/categories")}>
            Go to Categories
          </button>
        </div>

        <div className="dashboard-card">
          <h3>📰 Manage News</h3>
          <p>Create, edit, and publish your latest articles.</p>
          <button onClick={() => handleNavigation("/staff/news")}>
            Go to News
          </button>
        </div>

        <div className="dashboard-card">
          <h3>👤 View Profile</h3>
          <p>Review your account details and preferences.</p>
          <button onClick={() => handleNavigation("/staff/profile")}>
            View Profile
          </button>
        </div>

        <div className="dashboard-card">
          <h3>📜 News History</h3>
          <p>View your previous submissions and edits.</p>
          <button onClick={() => handleNavigation("/staff/history")}>
            View History
          </button>
        </div>
      </div>
    </div>
  );
}