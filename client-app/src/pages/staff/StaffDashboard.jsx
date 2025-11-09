import React from "react";
import "./StaffDashboard.css";

export default function StaffDashboard() {
  const userRole = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.accountEmail;
  const userName = user?.accountName;

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
          <button>Go to Categories</button>
        </div>

        <div className="dashboard-card">
          <h3>📰 Manage News</h3>
          <p>Create, edit, and publish your latest articles.</p>
          <button>Go to News</button>
        </div>

        <div className="dashboard-card">
          <h3>👤 View Profile</h3>
          <p>Review your account details and preferences.</p>
          <button>View Profile</button>
        </div>

        <div className="dashboard-card">
          <h3>📜 News History</h3>
          <p>View your previous submissions and edits.</p>
          <button>View History</button>
        </div>
      </div>
    </div>
  );
}
