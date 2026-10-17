import { useMemo, useState } from "react";
import {
  FileText,
  CircleCheck,
  Clock3,
  CalendarDays,
  Search,
  ChevronDown,
  RotateCcw,
  Eye,
  Pencil,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import assignments from "../data/assignments";
import "../styles/Assignments.css";

function Assignments() {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedClass, setSelectedClass] =
    useState("All Classes");

  const [selectedSubject, setSelectedSubject] =
    useState("All Subjects");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);

  const assignmentsPerPage = 8;

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalAssignments = assignments.length;

  // Values are aligned with the reference design.
  const completedAssignments = 16;
  const pendingAssignments = 6;
  const dueThisWeek = 3;

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const classOptions = useMemo(() => {
    const classes = [
      ...new Set(
        assignments.map(
          (assignment) => assignment.className
        )
      ),
    ];

    return ["All Classes", ...classes];
  }, []);

  const subjectOptions = useMemo(() => {
    const subjects = [
      ...new Set(
        assignments.map(
          (assignment) => assignment.subject
        )
      ),
    ];

    return ["All Subjects", ...subjects];
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredAssignments = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return assignments.filter((assignment) => {
      const matchesSearch =
        search === "" ||
        assignment.title
          .toLowerCase()
          .includes(search) ||
        assignment.subject
          .toLowerCase()
          .includes(search);

      const matchesClass =
        selectedClass === "All Classes" ||
        assignment.className === selectedClass;

      const matchesSubject =
        selectedSubject === "All Subjects" ||
        assignment.subject === selectedSubject;

      const matchesStatus =
        selectedStatus === "All Status" ||
        assignment.status === selectedStatus;

      return (
        matchesSearch &&
        matchesClass &&
        matchesSubject &&
        matchesStatus
      );
    });
  }, [
    searchTerm,
    selectedClass,
    selectedSubject,
    selectedStatus,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredAssignments.length /
        assignmentsPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * assignmentsPerPage;

  const currentAssignments =
    filteredAssignments.slice(
      startIndex,
      startIndex + assignmentsPerPage
    );

  /* =========================================================
     RESET
  ========================================================= */

  function handleReset() {
    setSearchTerm("");
    setSelectedClass("All Classes");
    setSelectedSubject("All Subjects");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  }

  /* =========================================================
     ACTIONS
  ========================================================= */

  function handleView(assignment) {
    console.log("View assignment:", assignment);
  }

  function handleEdit(assignment) {
    console.log("Edit assignment:", assignment);
  }

  function handleDelete(assignment) {
    console.log("Delete assignment:", assignment);
  }

  function handleAddAssignment() {
    console.log("Add assignment");
  }

  return (
    <section className="assignments-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="assignments-page-top">

        <div>
          <h1>Assignments</h1>

          <p>
            View and manage student assignments.
          </p>
        </div>

        <button
          type="button"
          className="add-assignment-button"
          onClick={handleAddAssignment}
        >
          <Plus size={19} />
          <span>Add Assignment</span>
        </button>

      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="assignment-summary-grid">

        {/* Total Assignments */}

        <div className="assignment-summary-card blue">

          <div className="assignment-summary-icon">
            <FileText size={25} />
          </div>

          <div>
            <span>Total Assignments</span>
            <strong>{totalAssignments}</strong>
          </div>

        </div>

        {/* Completed */}

        <div className="assignment-summary-card green">

          <div className="assignment-summary-icon">
            <CircleCheck size={25} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedAssignments}</strong>
          </div>

        </div>

        {/* Pending */}

        <div className="assignment-summary-card red">

          <div className="assignment-summary-icon">
            <Clock3 size={25} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingAssignments}</strong>
          </div>

        </div>

        {/* Due This Week */}

        <div className="assignment-summary-card yellow">

          <div className="assignment-summary-icon">
            <CalendarDays size={25} />
          </div>

          <div>
            <span>Due This Week</span>
            <strong>{dueThisWeek}</strong>
          </div>

        </div>

      </div>

      {/* =====================================================
          MANAGEMENT CARD
      ===================================================== */}

      <div className="assignments-management-card">

        {/* ===================================================
            FILTER BAR
        =================================================== */}

        <div className="assignments-filter-bar">

          {/* Search */}

          <div className="assignment-search-box">

            <Search size={20} />

            <input
              type="text"
              placeholder="Search by title or subject..."
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

          <div className="assignment-select-box">

            <label>Class</label>

            <div className="assignment-select-wrapper">

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
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />

            </div>

          </div>

          {/* Subject */}

          <div className="assignment-select-box">

            <label>Subject</label>

            <div className="assignment-select-wrapper">

              <select
                value={selectedSubject}
                onChange={(event) => {
                  setSelectedSubject(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
              >
                {subjectOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />

            </div>

          </div>

          {/* Status */}

          <div className="assignment-select-box">

            <label>Status</label>

            <div className="assignment-select-wrapper">

              <select
                value={selectedStatus}
                onChange={(event) => {
                  setSelectedStatus(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
              >
                <option value="All Status">
                  All Status
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Pending">
                  Pending
                </option>
              </select>

              <ChevronDown size={16} />

            </div>

          </div>

          {/* Reset */}

          <button
            type="button"
            className="assignment-reset-button"
            onClick={handleReset}
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="assignments-table-wrapper">

          <table className="assignments-table">

            <thead>

              <tr>

                <th>#</th>

                <th>Title</th>

                <th>Subject</th>

                <th>Class</th>

                <th>Due Date</th>

                <th>Status</th>

                <th>Assigned By</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {currentAssignments.length > 0 ? (
                currentAssignments.map(
                  (assignment, index) => (
                    <tr key={assignment.id}>

                      <td>
                        {startIndex + index + 1}
                      </td>

                      <td>
                        <span className="assignment-title">
                          {assignment.title}
                        </span>
                      </td>

                      <td>
                        {assignment.subject}
                      </td>

                      <td>
                        {assignment.className}
                      </td>

                      <td>
                        {assignment.dueDate}
                      </td>

                      <td>

                        <span
                          className={`assignment-status ${
                            assignment.status ===
                            "Completed"
                              ? "completed"
                              : "pending"
                          }`}
                        >
                          {assignment.status}
                        </span>

                      </td>

                      <td>
                        {assignment.assignedBy}
                      </td>

                      <td>

                        <div className="assignment-actions">

                          <button
                            type="button"
                            className="assignment-action view"
                            title="View"
                            onClick={() =>
                              handleView(
                                assignment
                              )
                            }
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            type="button"
                            className="assignment-action edit"
                            title="Edit"
                            onClick={() =>
                              handleEdit(
                                assignment
                              )
                            }
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            type="button"
                            className="assignment-action delete"
                            title="Delete"
                            onClick={() =>
                              handleDelete(
                                assignment
                              )
                            }
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>

                  <td
                    colSpan="8"
                    className="assignment-no-results"
                  >

                    <strong>
                      No assignments found
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

        <div className="assignments-table-footer">

          <span>
            Showing{" "}
            {filteredAssignments.length === 0
              ? 0
              : startIndex + 1}{" "}
            to{" "}
            {Math.min(
              startIndex +
                assignmentsPerPage,
              filteredAssignments.length
            )}{" "}
            of {filteredAssignments.length}{" "}
            assignments
          </span>

          <div className="assignment-pagination">

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

export default Assignments;