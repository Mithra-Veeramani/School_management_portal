
import {
  LayoutDashboard,
  UsersRound,
  UserRound,
  BookOpen,
  BookOpenText,
  CalendarCheck,
  FileText,
  ChartNoAxesColumn,
  Settings,
  LogOut,
  GraduationCap,
  X,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Students", icon: UsersRound },
  { label: "Teachers", icon: UserRound },
  { label: "Classes", icon: BookOpen },
  { label: "Subjects", icon: BookOpenText },
  { label: "Attendance", icon: CalendarCheck },
  { label: "Assignments", icon: FileText },
  { label: "Reports", icon: ChartNoAxesColumn },
];

function Sidebar({
  collapsed,
  mobileOpen,
  activePage,
  onNavigate,
  onCloseMobile,
}) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={onCloseMobile}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={[
          "sidebar",
          collapsed ? "collapsed" : "",
          mobileOpen ? "mobile-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="sidebar-brand">
          <div className="school-logo sidebar-logo">
            <GraduationCap size={36} strokeWidth={1.7} />
          </div>

          <div className="sidebar-brand-details">
            <h2>EduCare School</h2>
            <p>School Management Portal</p>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {menuItems.map(({ label, icon: Icon }) => (
            <button
              type="button"
              key={label}
              className={`sidebar-link ${
                activePage === label ? "active" : ""
              }`}
              onClick={() => onNavigate(label)}
              title={collapsed ? label : ""}
              aria-current={activePage === label ? "page" : undefined}
            >
              <Icon size={21} strokeWidth={1.8} />
              <span className="sidebar-label">{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            className={`sidebar-link ${
              activePage === "Settings" ? "active" : ""
            }`}
            onClick={() => onNavigate("Settings")}
            title={collapsed ? "Settings" : ""}
          >
            <Settings size={21} strokeWidth={1.8} />
            <span className="sidebar-label">Settings</span>
          </button>

          <button
            type="button"
            className="sidebar-link logout-link"
            onClick={() => onNavigate("Logout")}
            title={collapsed ? "Logout" : ""}
          >
            <LogOut size={21} strokeWidth={1.8} />
            <span className="sidebar-label">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
