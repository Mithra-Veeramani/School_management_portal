
import { useState } from "react";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  GraduationCap,
  UserRound,
  Settings,
  LogOut,
  Check,
  X,
} from "lucide-react";

function Header({ onMenuClick, darkMode, onToggleTheme }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unread, setUnread] = useState(3);

  const notifications = [
    {
      title: "New student added",
      description: "Arjun Kumar joined Class 6",
      time: "2 hours ago",
      type: "student",
    },
    {
      title: "Assignment submitted",
      description: "Priya Mehta - Science",
      time: "4 hours ago",
      type: "assignment",
    },
    {
      title: "Attendance updated",
      description: "Class 7A",
      time: "6 hours ago",
      type: "attendance",
    },
  ];

  return (
    <header className="header">
      <div className="header-brand-area">
        <button
          type="button"
          className="icon-button menu-button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={23} />
        </button>

        <div className="school-brand">
          <div className="school-logo">
            <GraduationCap size={37} strokeWidth={1.7} />
          </div>

          <div className="brand-details">
            <h2>EduCare School</h2>
            <p>School Management Portal</p>
          </div>
        </div>
      </div>

      <div className="header-search">
        <Search size={19} />
        <input
          type="search"
          placeholder="Search students, teachers, classes..."
          aria-label="Search school records"
        />
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="icon-button theme-button"
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
          title="Toggle theme"
        >
          {darkMode ? <Moon size={22} /> : <Sun size={22} />}
        </button>

        <div className="header-popover-anchor">
          <button
            type="button"
            className="icon-button notification-button"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={23} />
            {unread > 0 && (
              <span className="notification-badge">{unread}</span>
            )}
          </button>

          {notificationsOpen && (
            <div className="notification-panel">
              <div className="popover-heading">
                <strong>Notifications</strong>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => setUnread(0)}
                >
                  Mark all read
                </button>
              </div>

              {notifications.map((item) => (
                <div className="notification-item" key={item.title}>
                  <div className={`notification-icon ${item.type}`}>
                    {item.type === "student" && <UserRound size={18} />}
                    {item.type === "assignment" && <Check size={18} />}
                    {item.type === "attendance" && <GraduationCap size={18} />}
                  </div>

                  <div className="notification-copy">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <span>{item.time}</span>
                  </div>

                  {unread > 0 && (
                    <span className="unread-dot" />
                  )}
                </div>
              ))}

              <button
                type="button"
                className="view-notifications"
                onClick={() => setNotificationsOpen(false)}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        <div className="header-popover-anchor">
          <button
            type="button"
            className="admin-trigger"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            aria-expanded={profileOpen}
          >
            <div className="admin-avatar">A</div>

            <div className="admin-details">
              <strong>Admin</strong>
              <span>School Staff</span>
            </div>

            <ChevronDown
              size={18}
              className={profileOpen ? "rotate-chevron" : ""}
            />
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="admin-avatar large-avatar">A</div>
                <div>
                  <strong>Admin</strong>
                  <span>admin@educare.com</span>
                </div>
              </div>

              <button type="button" className="dropdown-item">
                <UserRound size={18} />
                <span>Profile</span>
              </button>

              <button type="button" className="dropdown-item">
                <Settings size={18} />
                <span>Settings</span>
              </button>

              <button
                type="button"
                className="dropdown-item theme-dropdown-item"
                onClick={onToggleTheme}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                <span className={`theme-switch ${darkMode ? "enabled" : ""}`}>
                  <span />
                </span>
              </button>

              <div className="dropdown-divider" />

              <button
                type="button"
                className="dropdown-item logout-item"
                onClick={() => setProfileOpen(false)}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {notificationsOpen && (
        <button
          type="button"
          className="popover-dismiss"
          aria-label="Close notifications"
          onClick={() => setNotificationsOpen(false)}
        >
          <X size={1} />
        </button>
      )}
    </header>
  );
}

export default Header;
