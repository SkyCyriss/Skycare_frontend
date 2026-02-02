import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { 
  ClipboardList, 
  User, 
  FileText, 
  LogOut,
  Activity
} from "lucide-react";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("registrationSuccess");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      {/* ================= Sidebar ================= */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <div className="dashboard-logo">
            <Activity size={28} className="dashboard-logo-icon" />
            <span className="dashboard-logo-text">CLINIC</span>
          </div>
        </div>

        <nav className="dashboard-nav">
          <NavLink to="/dashboard/live-queue" className="dashboard-nav-link">
            <ClipboardList size={20} />
            <span>Live Queue</span>
          </NavLink>

          <NavLink to="/dashboard/patient-360" className="dashboard-nav-link">
            <User size={20} />
            <span>Patient 360</span>
          </NavLink>

          <NavLink to="/dashboard/treatment-plan" className="dashboard-nav-link">
            <FileText size={20} />
            <span>Treatment Plan</span>
          </NavLink>
        </nav>

        <div className="dashboard-sidebar-footer">
          <button onClick={handleLogout} className="dashboard-logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= Main Area ================= */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <h3 className="dashboard-topbar-title">Doctor Dashboard</h3>
          <div className="dashboard-status">
            <span className="dashboard-status-indicator"></span>
            <span className="dashboard-status-text">Online</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}