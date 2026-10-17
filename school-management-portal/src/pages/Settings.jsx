import { useState } from "react";
import {
  Settings as SettingsIcon,
  CalendarDays,
  UsersRound,
  Bell,
  Palette,
  Building2,
  UserRound,
  Save,
  Upload,
  ChevronDown,
} from "lucide-react";

import "../styles/Settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("General");

  /* =========================================================
     SCHOOL PROFILE
  ========================================================= */

  const [schoolProfile, setSchoolProfile] = useState({
    schoolName: "EduCare School",
    schoolCode: "ECS001",
    email: "info@educareschool.com",
    phone: "+91 98765 43210",
    address:
      "123 School Road, Anna Nagar\nChennai, Tamil Nadu - 600040",
    city: "Chennai",
    state: "Tamil Nadu",
    pinCode: "600040",
  });

  /* =========================================================
     ACADEMIC SETTINGS
  ========================================================= */

  const [academicSettings, setAcademicSettings] = useState({
    academicYear: "2024 - 2025",
    currentTerm: "Term 1",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
  });

  /* =========================================================
     SYSTEM PREFERENCES
  ========================================================= */

  const [systemPreferences, setSystemPreferences] = useState({
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12 Hour (AM/PM)",
    defaultPage: "Dashboard",
    recordsPerPage: "10",
  });

  /* =========================================================
     CONTACT PERSON
  ========================================================= */

  const [contactPerson, setContactPerson] = useState({
    name: "Ramesh Kumar",
    designation: "Principal",
    email: "principal@educareschool.com",
    phone: "+91 98765 43210",
  });

  /* =========================================================
     NOTIFICATIONS
  ========================================================= */

  const [notifications, setNotifications] = useState({
    studentRegistration: true,
    assignmentSubmission: true,
    attendanceAlerts: false,
  });

  /* =========================================================
     INPUT HANDLERS
  ========================================================= */

  function handleSchoolChange(event) {
    const { name, value } = event.target;

    setSchoolProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleAcademicChange(event) {
    const { name, value } = event.target;

    setAcademicSettings((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSystemChange(event) {
    const { name, value } = event.target;

    setSystemPreferences((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleContactChange(event) {
    const { name, value } = event.target;

    setContactPerson((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  /* =========================================================
     NOTIFICATION TOGGLE
  ========================================================= */

  function toggleNotification(name) {
    setNotifications((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  }

  /* =========================================================
     SAVE HANDLERS
  ========================================================= */

  function handleSave(section) {
    console.log(`${section} settings saved`);
  }

  function handleChangeLogo() {
    console.log("Change logo clicked");
  }

  return (
    <section className="settings-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="settings-page-header">

        <div>
          <h1>Settings</h1>

          <p>
            Manage school information, academic settings and
            system preferences.
          </p>
        </div>

      </div>

      {/* =====================================================
          SETTINGS TABS
      ===================================================== */}

      <div className="settings-tabs">

        <button
          type="button"
          className={`settings-tab ${
            activeTab === "General" ? "active" : ""
          }`}
          onClick={() => setActiveTab("General")}
        >
          <SettingsIcon size={20} />
          <span>General</span>
        </button>

        <button
          type="button"
          className={`settings-tab ${
            activeTab === "Academic" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Academic")}
        >
          <CalendarDays size={20} />
          <span>Academic</span>
        </button>

        <button
          type="button"
          className={`settings-tab ${
            activeTab === "Users" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Users")}
        >
          <UsersRound size={20} />
          <span>Users</span>
        </button>

        <button
          type="button"
          className={`settings-tab ${
            activeTab === "Notifications" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Notifications")}
        >
          <Bell size={20} />
          <span>Notifications</span>
        </button>

        <button
          type="button"
          className={`settings-tab ${
            activeTab === "Appearance" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Appearance")}
        >
          <Palette size={20} />
          <span>Appearance</span>
        </button>

      </div>

      {/* =====================================================
          GENERAL TAB
      ===================================================== */}

      {activeTab === "General" && (
        <div className="settings-content-grid">

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="settings-left-column">

            {/* SCHOOL PROFILE */}

            <div className="settings-card school-profile-card">

              <div className="settings-card-header">

                <div className="settings-section-icon">
                  <SettingsIcon size={21} />
                </div>

                <div>
                  <h2>School Profile</h2>

                  <p>
                    Update your school details and contact
                    information.
                  </p>
                </div>

                <div className="school-logo-area">

                  <div className="school-logo-preview">
                    <Building2 size={28} />
                  </div>

                  <button
                    type="button"
                    className="change-logo-button"
                    onClick={handleChangeLogo}
                  >
                    Change Logo
                  </button>

                </div>

              </div>

              <div className="settings-form-grid">

                {/* SCHOOL NAME */}

                <div className="settings-field">

                  <label>
                    School Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="schoolName"
                    value={schoolProfile.schoolName}
                    onChange={handleSchoolChange}
                  />

                </div>

                {/* SCHOOL CODE */}

                <div className="settings-field">

                  <label>
                    School Code
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="schoolCode"
                    value={schoolProfile.schoolCode}
                    onChange={handleSchoolChange}
                  />

                </div>

                {/* EMAIL */}

                <div className="settings-field">

                  <label>
                    Email Address
                    <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={schoolProfile.email}
                    onChange={handleSchoolChange}
                  />

                </div>

                {/* PHONE */}

                <div className="settings-field">

                  <label>
                    Phone Number
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={schoolProfile.phone}
                    onChange={handleSchoolChange}
                  />

                </div>

                {/* ADDRESS */}

                <div className="settings-field full-width">

                  <label>
                    Address
                    <span>*</span>
                  </label>

                  <textarea
                    name="address"
                    rows="3"
                    value={schoolProfile.address}
                    onChange={handleSchoolChange}
                  />

                </div>

                {/* CITY */}

                <div className="settings-field">

                  <label>
                    City
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={schoolProfile.city}
                    onChange={handleSchoolChange}
                  />

                </div>

                {/* STATE */}

                <div className="settings-field">

                  <label>
                    State
                    <span>*</span>
                  </label>

                  <div className="settings-select-wrapper">

                    <select
                      name="state"
                      value={schoolProfile.state}
                      onChange={handleSchoolChange}
                    >
                      <option>Tamil Nadu</option>
                      <option>Puducherry</option>
                      <option>Kerala</option>
                      <option>Karnataka</option>
                      <option>Andhra Pradesh</option>
                      <option>Telangana</option>
                    </select>

                    <ChevronDown size={16} />

                  </div>

                </div>

                {/* PIN */}

                <div className="settings-field">

                  <label>
                    PIN Code
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="pinCode"
                    value={schoolProfile.pinCode}
                    onChange={handleSchoolChange}
                  />

                </div>

              </div>

              <div className="settings-card-footer">

                <button
                  type="button"
                  className="settings-save-button"
                  onClick={() =>
                    handleSave("School Profile")
                  }
                >
                  <Save size={17} />
                  <span>Save Changes</span>
                </button>

              </div>

            </div>

            {/* CONTACT PERSON */}

            <div className="settings-card">

              <div className="settings-card-header">

                <div className="settings-section-icon">
                  <UserRound size={21} />
                </div>

                <div>
                  <h2>Contact Person</h2>

                  <p>
                    Primary contact details for the school.
                  </p>
                </div>

              </div>

              <div className="settings-form-grid">

                {/* CONTACT NAME */}

                <div className="settings-field">

                  <label>
                    Contact Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={contactPerson.name}
                    onChange={handleContactChange}
                  />

                </div>

                {/* DESIGNATION */}

                <div className="settings-field">

                  <label>
                    Designation
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="designation"
                    value={contactPerson.designation}
                    onChange={handleContactChange}
                  />

                </div>

                {/* CONTACT EMAIL */}

                <div className="settings-field">

                  <label>
                    Contact Email
                    <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={contactPerson.email}
                    onChange={handleContactChange}
                  />

                </div>

                {/* CONTACT PHONE */}

                <div className="settings-field">

                  <label>
                    Contact Phone
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={contactPerson.phone}
                    onChange={handleContactChange}
                  />

                </div>

              </div>

              <div className="settings-card-footer">

                <button
                  type="button"
                  className="settings-save-button"
                  onClick={() =>
                    handleSave("Contact Person")
                  }
                >
                  <Save size={17} />
                  <span>Save Changes</span>
                </button>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="settings-right-column">

            {/* ACADEMIC SETTINGS */}

            <div className="settings-card">

              <div className="settings-card-header">

                <div className="settings-section-icon">
                  <CalendarDays size={21} />
                </div>

                <div>
                  <h2>Academic Settings</h2>

                  <p>
                    Configure academic year and term details.
                  </p>
                </div>

              </div>

              <div className="settings-form-grid">

                {/* ACADEMIC YEAR */}

                <div className="settings-field">

                  <label>
                    Academic Year
                    <span>*</span>
                  </label>

                  <div className="settings-select-wrapper">

                    <select
                      name="academicYear"
                      value={
                        academicSettings.academicYear
                      }
                      onChange={handleAcademicChange}
                    >
                      <option>
                        2024 - 2025
                      </option>

                      <option>
                        2025 - 2026
                      </option>

                      <option>
                        2026 - 2027
                      </option>
                    </select>

                    <ChevronDown size={16} />

                  </div>

                </div>

                {/* TERM */}

                <div className="settings-field">

                  <label>
                    Current Term
                    <span>*</span>
                  </label>

                  <div className="settings-select-wrapper">

                    <select
                      name="currentTerm"
                      value={
                        academicSettings.currentTerm
                      }
                      onChange={handleAcademicChange}
                    >
                      <option>Term 1</option>
                      <option>Term 2</option>
                      <option>Term 3</option>
                    </select>

                    <ChevronDown size={16} />

                  </div>

                </div>

                {/* START DATE */}

                <div className="settings-field">

                  <label>
                    Start Date
                    <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={
                      academicSettings.startDate
                    }
                    onChange={handleAcademicChange}
                  />

                </div>

                {/* END DATE */}

                <div className="settings-field">

                  <label>
                    End Date
                    <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={
                      academicSettings.endDate
                    }
                    onChange={handleAcademicChange}
                  />

                </div>

              </div>

              <div className="settings-card-footer">

                <button
                  type="button"
                  className="settings-save-button"
                  onClick={() =>
                    handleSave("Academic Settings")
                  }
                >
                  <Save size={17} />
                  <span>Save Changes</span>
                </button>

              </div>

            </div>

            {/* SYSTEM PREFERENCES */}

            <div className="settings-card">

              <div className="settings-card-header">

                <div className="settings-section-icon">
                  <SettingsIcon size={21} />
                </div>

                <div>
                  <h2>System Preferences</h2>

                  <p>
                    Set basic system preferences.
                  </p>
                </div>

              </div>

              <div className="settings-form-grid">

                {/* DATE FORMAT */}

                <div className="settings-field">

                  <label>Date Format</label>

                  <div className="settings-select-wrapper">

                    <select
                      name="dateFormat"
                      value={
                        systemPreferences.dateFormat
                      }
                      onChange={handleSystemChange}
                    >
                      <option>
                        DD/MM/YYYY
                      </option>

                      <option>
                        MM/DD/YYYY
                      </option>

                      <option>
                        YYYY-MM-DD
                      </option>
                    </select>

                    <ChevronDown size={16} />

                  </div>

                </div>

                {/* TIME FORMAT */}

                <div className="settings-field">

                  <label>Time Format</label>

                  <div className="settings-select-wrapper">

                    <select
                      name="timeFormat"
                      value={
                        systemPreferences.timeFormat
                      }
                      onChange={handleSystemChange}
                    >
                      <option>
                        12 Hour (AM/PM)
                      </option>

                      <option>
                        24 Hour
                      </option>
                    </select>

                    <ChevronDown size={16} />

                  </div>

                </div>

                {/* DEFAULT PAGE */}

                <div className="settings-field">

                  <label>Default Page</label>

                  <div className="settings-select-wrapper">

                    <select
                      name="defaultPage"
                      value={
                        systemPreferences.defaultPage
                      }
                      onChange={handleSystemChange}
                    >
                      <option>Dashboard</option>
                      <option>Students</option>
                      <option>Teachers</option>
                      <option>Classes</option>
                      <option>Subjects</option>
                      <option>Attendance</option>
                      <option>Assignments</option>
                      <option>Reports</option>
                    </select>

                    <ChevronDown size={16} />

                  </div>

                </div>

                {/* RECORDS */}

                <div className="settings-field">

                  <label>Records Per Page</label>

                  <div className="settings-select-wrapper">

                    <select
                      name="recordsPerPage"
                      value={
                        systemPreferences.recordsPerPage
                      }
                      onChange={handleSystemChange}
                    >
                      <option>10</option>
                      <option>20</option>
                      <option>25</option>
                      <option>50</option>
                    </select>

                    <ChevronDown size={16} />

                  </div>

                </div>

              </div>

              <div className="settings-card-footer">

                <button
                  type="button"
                  className="settings-save-button"
                  onClick={() =>
                    handleSave("System Preferences")
                  }
                >
                  <Save size={17} />
                  <span>Save Changes</span>
                </button>

              </div>

            </div>

            {/* NOTIFICATIONS */}

            <div className="settings-card">

              <div className="settings-card-header">

                <div className="settings-section-icon">
                  <Bell size={21} />
                </div>

                <div>
                  <h2>Notification Settings</h2>

                  <p>
                    Manage email notifications.
                  </p>
                </div>

              </div>

              <div className="notification-list">

                {/* STUDENT */}

                <div className="notification-row">

                  <span>
                    Student Registration Notifications
                  </span>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      notifications.studentRegistration
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleNotification(
                        "studentRegistration"
                      )
                    }
                    aria-label="Toggle student registration notifications"
                  >
                    <span></span>
                  </button>

                </div>

                {/* ASSIGNMENT */}

                <div className="notification-row">

                  <span>
                    Assignment Submission Notifications
                  </span>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      notifications.assignmentSubmission
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleNotification(
                        "assignmentSubmission"
                      )
                    }
                    aria-label="Toggle assignment submission notifications"
                  >
                    <span></span>
                  </button>

                </div>

                {/* ATTENDANCE */}

                <div className="notification-row">

                  <span>
                    Attendance Alerts
                  </span>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      notifications.attendanceAlerts
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleNotification(
                        "attendanceAlerts"
                      )
                    }
                    aria-label="Toggle attendance alerts"
                  >
                    <span></span>
                  </button>

                </div>

              </div>

              <div className="settings-card-footer">

                <button
                  type="button"
                  className="settings-save-button"
                  onClick={() =>
                    handleSave(
                      "Notification Settings"
                    )
                  }
                >
                  <Save size={17} />
                  <span>Save Changes</span>
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          OTHER TABS
      ===================================================== */}

      {activeTab !== "General" && (
        <div className="settings-tab-placeholder">

          {activeTab === "Academic" && (
            <>
              <CalendarDays size={42} />
              <h2>Academic Settings</h2>
              <p>
                Academic configuration is available from
                the settings sections.
              </p>
            </>
          )}

          {activeTab === "Users" && (
            <>
              <UsersRound size={42} />
              <h2>User Settings</h2>
              <p>
                Manage school administrators, teachers and
                staff accounts here.
              </p>
            </>
          )}

          {activeTab === "Notifications" && (
            <>
              <Bell size={42} />
              <h2>Notification Settings</h2>
              <p>
                Manage notification preferences here.
              </p>
            </>
          )}

          {activeTab === "Appearance" && (
            <>
              <Palette size={42} />
              <h2>Appearance Settings</h2>
              <p>
                Configure portal appearance preferences here.
              </p>
            </>
          )}

        </div>
      )}

    </section>
  );
}

export default Settings;