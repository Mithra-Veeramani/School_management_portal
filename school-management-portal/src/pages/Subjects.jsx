import { useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  UsersRound,
  FileText,
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

import subjects from "../data/subjects";
import "../styles/Subjects.css";

function Subjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] =
    useState("All Classes");
  const [selectedTeacher, setSelectedTeacher] =
    useState("All Teachers");
  const [selectedStatus, setSelectedStatus] =
    useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const subjectsPerPage = 8;

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalSubjects = subjects.length;

  const subjectsWithTeachers = subjects.filter(
    (subject) => subject.teacher
  ).length;

  const totalClasses = 12;

  const unassignedSubjects = subjects.filter(
    (subject) => !subject.teacher
  ).length;

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const classOptions = useMemo(() => {
    const classList = [
      ...new Set(
        subjects.flatMap((subject) => subject.classes)
      ),
    ];

    return ["All Classes", ...classList];
  }, []);

  const teacherOptions = useMemo(() => {
    const teacherList = [
      ...new Set(
        subjects
          .map((subject) => subject.teacher)
          .filter(Boolean)
      ),
    ];

    return ["All Teachers", ...teacherList];
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredSubjects = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return subjects.filter((subject) => {
      const matchesSearch =
        search === "" ||
        subject.name.toLowerCase().includes(search) ||
        subject.id.toLowerCase().includes(search);

      const matchesClass =
        selectedClass === "All Classes" ||
        subject.classes.includes(selectedClass);

      const matchesTeacher =
        selectedTeacher === "All Teachers" ||
        subject.teacher === selectedTeacher;

      const matchesStatus =
        selectedStatus === "All Status" ||
        subject.status === selectedStatus;

      return (
        matchesSearch &&
        matchesClass &&
        matchesTeacher &&
        matchesStatus
      );
    });
  }, [
    searchTerm,
    selectedClass,
    selectedTeacher,
    selectedStatus,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredSubjects.length / subjectsPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * subjectsPerPage;

  const currentSubjects = filteredSubjects.slice(
    startIndex,
    startIndex + subjectsPerPage
  );

  /* =========================================================
     RESET
  ========================================================= */

  function handleReset() {
    setSearchTerm("");
    setSelectedClass("All Classes");
    setSelectedTeacher("All Teachers");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  }

  /* =========================================================
     ACTIONS
  ========================================================= */

  function handleView(subject) {
    console.log("View subject:", subject);
  }

  function handleEdit(subject) {
    console.log("Edit subject:", subject);
  }

  function handleDelete(subject) {
    console.log("Delete subject:", subject);
  }

  return (
    <section className="subjects-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="subjects-page-top">
        <div>
          <h1>Subjects</h1>
          <p>
            Manage subjects and view the classes they are
            assigned to.
          </p>
        </div>

        <button
          type="button"
          className="add-subject-button"
        >
          <Plus size={19} />
          <span>Add Subject</span>
        </button>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="subject-summary-grid">

        {/* Total Subjects */}

        <div className="subject-summary-card purple">
          <div className="subject-summary-icon">
            <BookOpen size={25} />
          </div>

          <div>
            <span>Total Subjects</span>
            <strong>{totalSubjects}</strong>
          </div>
        </div>

        {/* Subjects With Teachers */}

        <div className="subject-summary-card green">
          <div className="subject-summary-icon">
            <GraduationCap size={25} />
          </div>

          <div>
            <span>Subjects with Teachers</span>
            <strong>{subjectsWithTeachers}</strong>
          </div>
        </div>

        {/* Total Classes */}

        <div className="subject-summary-card yellow">
          <div className="subject-summary-icon">
            <UsersRound size={25} />
          </div>

          <div>
            <span>Total Classes</span>
            <strong>{totalClasses}</strong>
          </div>
        </div>

        {/* Unassigned Subjects */}

        <div className="subject-summary-card red">
          <div className="subject-summary-icon">
            <FileText size={25} />
          </div>

          <div>
            <span>Unassigned Subjects</span>
            <strong>{unassignedSubjects}</strong>
          </div>
        </div>

      </div>

      {/* =====================================================
          MANAGEMENT CARD
      ===================================================== */}

      <div className="subjects-management-card">

        {/* ===================================================
            FILTER BAR
        =================================================== */}

        <div className="subjects-filter-bar">

          {/* Search */}

          <div className="subject-search-box">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search by subject name or code..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Class */}

          <div className="subject-select-box">
            <label>Class</label>

            <div className="subject-select-wrapper">
              <select
                value={selectedClass}
                onChange={(event) => {
                  setSelectedClass(event.target.value);
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

          {/* Teacher */}

          <div className="subject-select-box">
            <label>Teacher</label>

            <div className="subject-select-wrapper">
              <select
                value={selectedTeacher}
                onChange={(event) => {
                  setSelectedTeacher(event.target.value);
                  setCurrentPage(1);
                }}
              >
                {teacherOptions.map((item) => (
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

          <div className="subject-select-box">
            <label>Status</label>

            <div className="subject-select-wrapper">
              <select
                value={selectedStatus}
                onChange={(event) => {
                  setSelectedStatus(event.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All Status">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          {/* Reset */}

          <button
            type="button"
            className="subject-reset-button"
            onClick={handleReset}
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="subjects-table-wrapper">

          <table className="subjects-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Classes Assigned</th>
                <th>Teacher Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {currentSubjects.length > 0 ? (
                currentSubjects.map(
                  (subject, index) => (
                    <tr key={subject.id}>

                      <td>
                        {startIndex + index + 1}
                      </td>

                      <td>
                        <span className="subject-code">
                          {subject.id}
                        </span>
                      </td>

                      <td>
                        <span className="subject-name">
                          {subject.name}
                        </span>
                      </td>

                      <td>
                        {subject.classes.join(", ")}
                      </td>

                      <td>
                        {subject.teacher || "Unassigned"}
                      </td>

                      <td>
                        <span
                          className={`subject-status ${
                            subject.status === "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          {subject.status}
                        </span>
                      </td>

                      <td>
                        <div className="subject-actions">

                          <button
                            type="button"
                            className="subject-action view"
                            title="View"
                            onClick={() =>
                              handleView(subject)
                            }
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            type="button"
                            className="subject-action edit"
                            title="Edit"
                            onClick={() =>
                              handleEdit(subject)
                            }
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            type="button"
                            className="subject-action delete"
                            title="Delete"
                            onClick={() =>
                              handleDelete(subject)
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
                    colSpan="7"
                    className="subject-no-results"
                  >
                    <strong>
                      No subjects found
                    </strong>

                    <span>
                      Try changing your search or
                      filters.
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

        <div className="subjects-table-footer">

          <span>
            Showing{" "}
            {filteredSubjects.length === 0
              ? 0
              : startIndex + 1}{" "}
            to{" "}
            {Math.min(
              startIndex + subjectsPerPage,
              filteredSubjects.length
            )}{" "}
            of {filteredSubjects.length} subjects
          </span>

          <div className="subject-pagination">

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

export default Subjects;