import { useMemo, useState } from "react";
import {
  UsersRound,
  CircleCheck,
  CircleX,
  PieChart,
  CalendarDays,
  Search,
  ChevronDown,
  RotateCcw,
  Pencil,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import attendance from "../data/attendance";
import "../styles/Attendance.css";

function Attendance() {
  const [selectedDate, setSelectedDate] =
    useState("2024-08-27");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedClass, setSelectedClass] =
    useState("6");

  const [selectedSection, setSelectedSection] =
    useState("A");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 8;

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalStudents = 58;

  const presentStudents = 48;

  const absentStudents = 8;

  const attendancePercentage = (
    (presentStudents / totalStudents) *
    100
  ).toFixed(1);

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const classOptions = useMemo(() => {
    return [
      "All Classes",
      ...new Set(
        attendance.map((student) => student.className)
      ),
    ];
  }, []);

  const sectionOptions = useMemo(() => {
    return [
      "All Sections",
      ...new Set(
        attendance.map((student) => student.section)
      ),
    ];
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredStudents = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return attendance.filter((student) => {
      const matchesSearch =
        search === "" ||
        student.name.toLowerCase().includes(search) ||
        student.id.toLowerCase().includes(search);

      const matchesClass =
        selectedClass === "All Classes" ||
        student.className === selectedClass;

      const matchesSection =
        selectedSection === "All Sections" ||
        student.section === selectedSection;

      const matchesStatus =
        selectedStatus === "All" ||
        student.status === selectedStatus;

      return (
        matchesSearch &&
        matchesClass &&
        matchesSection &&
        matchesStatus
      );
    });
  }, [
    searchTerm,
    selectedClass,
    selectedSection,
    selectedStatus,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length / studentsPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * studentsPerPage;

  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  /* =========================================================
     RESET
  ========================================================= */

  function handleReset() {
    setSearchTerm("");
    setSelectedClass("6");
    setSelectedSection("A");
    setSelectedStatus("All");
    setCurrentPage(1);
  }

  /* =========================================================
     DATE
  ========================================================= */

  function formatDate(dateValue) {
    if (!dateValue) return "";

    const date = new Date(
      `${dateValue}T00:00:00`
    );

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  /* =========================================================
     ACTION
  ========================================================= */

  function handleEdit(student) {
    console.log("Edit attendance:", student);
  }

  function handleMarkAttendance() {
    console.log("Mark attendance");
  }

  return (
    <section className="attendance-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="attendance-page-top">

        <div>
          <h1>Attendance</h1>

          <p>
            View and manage student attendance.
          </p>
        </div>

        <div className="attendance-header-actions">

          <div className="attendance-date-picker">
            <CalendarDays size={20} />

            <input
              type="date"
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(
                  event.target.value
                );
              }}
            />

            <span>
              {formatDate(selectedDate)}
            </span>

            <ChevronDown size={16} />
          </div>

          <button
            type="button"
            className="mark-attendance-button"
            onClick={handleMarkAttendance}
          >
            <Plus size={19} />
            <span>Mark Attendance</span>
          </button>

        </div>

      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="attendance-summary-grid">

        <div className="attendance-summary-card green">
          <div className="attendance-summary-icon">
            <UsersRound size={25} />
          </div>

          <div>
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
          </div>
        </div>

        <div className="attendance-summary-card blue">
          <div className="attendance-summary-icon">
            <CircleCheck size={25} />
          </div>

          <div>
            <span>Present</span>
            <strong>{presentStudents}</strong>
          </div>
        </div>

        <div className="attendance-summary-card red">
          <div className="attendance-summary-icon">
            <CircleX size={25} />
          </div>

          <div>
            <span>Absent</span>
            <strong>{absentStudents}</strong>
          </div>
        </div>

        <div className="attendance-summary-card yellow">
          <div className="attendance-summary-icon">
            <PieChart size={25} />
          </div>

          <div>
            <span>Attendance Percentage</span>
            <strong>
              {attendancePercentage}%
            </strong>
          </div>
        </div>

      </div>

      {/* =====================================================
          MANAGEMENT CARD
      ===================================================== */}

      <div className="attendance-management-card">

        {/* FILTER BAR */}

        <div className="attendance-filter-bar">

          <div className="attendance-search-box">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(
                  event.target.value
                );
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Class */}

          <div className="attendance-select-box">
            <label>Class</label>

            <div className="attendance-select-wrapper">
              <select
                value={selectedClass}
                onChange={(event) => {
                  setSelectedClass(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
              >
                {classOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All Classes"
                      ? item
                      : `Class ${item}`}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          {/* Section */}

          <div className="attendance-select-box">
            <label>Section</label>

            <div className="attendance-select-wrapper">
              <select
                value={selectedSection}
                onChange={(event) => {
                  setSelectedSection(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
              >
                {sectionOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All Sections"
                      ? item
                      : `Section ${item}`}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          {/* Status */}

          <div className="attendance-select-box">
            <label>Status</label>

            <div className="attendance-select-wrapper">
              <select
                value={selectedStatus}
                onChange={(event) => {
                  setSelectedStatus(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
              >
                <option value="All">
                  All
                </option>

                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          {/* Reset */}

          <button
            type="button"
            className="attendance-reset-button"
            onClick={handleReset}
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="attendance-table-wrapper">

          <table className="attendance-table">

            <thead>
              <tr>

                <th className="attendance-checkbox-column">
                  <input
                    type="checkbox"
                    aria-label="Select all students"
                  />
                </th>

                <th>#</th>

                <th>Student ID</th>

                <th>Name</th>

                <th>Class</th>

                <th>Section</th>

                <th>Status</th>

                <th>Remarks</th>

                <th>Actions</th>

              </tr>
            </thead>

            <tbody>

              {currentStudents.length > 0 ? (
                currentStudents.map(
                  (student, index) => {

                    const initial =
                      student.name
                        .charAt(0)
                        .toUpperCase();

                    return (
                      <tr key={student.id}>

                        <td className="attendance-checkbox-column">
                          <input
                            type="checkbox"
                            aria-label={`Select ${student.name}`}
                          />
                        </td>

                        <td>
                          {startIndex + index + 1}
                        </td>

                        <td>
                          <span className="attendance-student-id">
                            {student.id}
                          </span>
                        </td>

                        <td>
                          <div className="attendance-student-name">

                            <div className="attendance-avatar">
                              {initial}
                            </div>

                            <span>
                              {student.name}
                            </span>

                          </div>
                        </td>

                        <td>
                          {student.className}
                        </td>

                        <td>
                          {student.section}
                        </td>

                        <td>
                          <span
                            className={`attendance-status ${
                              student.status ===
                              "Present"
                                ? "present"
                                : "absent"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>

                        <td>
                          <input
                            type="text"
                            className="attendance-remarks"
                            value={student.remarks}
                            readOnly
                            aria-label={`Remarks for ${student.name}`}
                          />
                        </td>

                        <td>
                          <button
                            type="button"
                            className="attendance-edit-button"
                            title="Edit attendance"
                            onClick={() =>
                              handleEdit(student)
                            }
                          >
                            <Pencil size={18} />
                          </button>
                        </td>

                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="attendance-no-results"
                  >
                    <strong>
                      No students found
                    </strong>

                    <span>
                      Try changing your search
                      or filters.
                    </span>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <div className="attendance-table-footer">

          <span>
            Showing{" "}
            {filteredStudents.length === 0
              ? 0
              : startIndex + 1}{" "}
            to{" "}
            {Math.min(
              startIndex + studentsPerPage,
              filteredStudents.length
            )}{" "}
            of {filteredStudents.length} students
          </span>

          <div className="attendance-pagination">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(
                    totalPages,
                    page + 1
                  )
                )
              }
            >
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Attendance;