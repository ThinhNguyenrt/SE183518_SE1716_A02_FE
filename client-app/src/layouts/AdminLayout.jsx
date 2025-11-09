import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export default function AdminLayout() {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <Link to="/admin/manage-accounts">Manage Accounts</Link>
          <Link to="/admin/reports">Reports</Link>
          <Link to="/">Logout</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
