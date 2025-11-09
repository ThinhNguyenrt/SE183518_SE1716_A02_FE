import { Link, Outlet, useLocation } from "react-router-dom";
import "./Layout.css";

export default function StaffLayout() {
  const location = useLocation();

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">🌟 Staff Panel</h2>
        <nav className="sidebar-nav">
          <Link
            to="/staff"
            className={location.pathname === "/staff" ? "active" : ""}
          >
            🏠 Dashboard
          </Link>
          <Link
            to="/staff/categories"
            className={
              location.pathname.startsWith("/staff/categories") ? "active" : ""
            }
          >
            📂 Manage Categories
          </Link>
          <Link
            to="/staff/news"
            className={
              location.pathname.startsWith("/staff/news") ? "active" : ""
            }
          >
            📰 Manage News
          </Link>
          <Link
            to="/staff/profile"
            className={
              location.pathname.startsWith("/staff/profile") ? "active" : ""
            }
          >
            👤 My Profile
          </Link>
          <Link
            to="/staff/history"
            className={
              location.pathname.startsWith("/staff/history") ? "active" : ""
            }
          >
            📜 News History
          </Link>
          <Link to="/" className="logout-link">
            🚪 Logout
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
