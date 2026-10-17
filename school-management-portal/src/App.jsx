import { useState } from "react";
import Header from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import StudentProfile from "./pages/StudentProfile";


import "./styles/Layout.css";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(credentials) {
    setIsLoggedIn(true);
  }

  function handleMenuClick() {
    setSidebarCollapsed((previous) => !previous);
    setMobileMenuOpen((previous) => !previous);
  }

  function handleNavigate(page) {
    setActivePage(page);
    setMobileMenuOpen(false);
  }

  function handleViewStudent(student) {
    setSelectedStudent(student);
    setActivePage("StudentProfile");
  }

  function handleBackToStudents() {
    setSelectedStudent(null);
    setActivePage("Students");
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }
  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <Header
        onMenuClick={handleMenuClick}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((previous) => !previous)}
      />

      <div className="app-body">
        <Sidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileMenuOpen}
          activePage={activePage}
          onNavigate={handleNavigate}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="main-content">

          {activePage === "Dashboard" && (
            <>
              <div className="page-heading">
                <div>
                  <h1>Dashboard</h1>
                  <p>
                    Welcome to your School Management Portal.
                  </p>
                </div>
              </div>

              <section className="welcome-card">
                <div>
                  <span className="welcome-label">EDUCARE SCHOOL</span>

                  <h2>Welcome back, Admin!</h2>

                  <p>
                    Manage your school activities from one place.
                  </p>
                </div>

                <GraduationCapPlaceholder />
              </section>

              <Dashboard />
            </>
          )}

          {activePage === "Students" && (
            <Students onViewStudent={handleViewStudent} />
          )}
          {activePage === "StudentProfile" && (
            <StudentProfile
              student={selectedStudent}
              onBack={handleBackToStudents}
            />
          )}
          {activePage === "Teachers" && <Teachers />}
          {activePage === "Classes" && <Classes />}
          {activePage === "Subjects" && <Subjects />}
          {activePage === "Attendance" && <Attendance />}
          {activePage === "Assignments" && <Assignments />}
          {activePage === "Reports" && <Reports />}
          {activePage === "Settings" && <Settings />}

        </main>
      </div>
    </div>
  );
}

function GraduationCapPlaceholder() {
  return (
    <div className="welcome-icon">
      <span>EDU</span>
    </div>
  );
}

export default App;
