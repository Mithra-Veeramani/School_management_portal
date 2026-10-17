import { useMemo, useState } from "react";
import {
  UsersRound,
  UserRoundCheck,
  UserRoundX,
  BookOpen,
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

import teachers from "../data/teachers";
import "../styles/Teachers.css";

function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const teachersPerPage = 8;

  // -----------------------------
  // Summary calculations
  // -----------------------------

  const totalTeachers = teachers.length;

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Active"
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "Inactive"
  ).length;

  // Unique subjects assigned to teachers
  const subjectsAssigned = new Set(
    teachers.map((teacher) => teacher.subject)
  ).size;

  // -----------------------------
  // Filter options
  // -----------------------------

  const subjectOptions = useMemo(() => {
    return [
      "All Subjects",
      ...new Set(teachers.map((teacher) => teacher.subject)),
    ];
  }, []);

  const classOptions = useMemo(() => {
    const classes = teachers.flatMap((teacher) => teacher.classes);

    return ["All Classes", ...new Set(classes)];
  }, []);

  // -----------------------------
  // Filter teachers
  // -----------------------------

  const filteredTeachers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return teachers.filter((teacher) => {
      const matchesSearch =
        search === "" ||
        teacher.name.toLowerCase().includes(search) ||
        teacher.id.toLowerCase().includes(search) ||
        teacher.subject.toLowerCase().includes(search);

      const matchesSubject =
        selectedSubject === "All Subjects" ||
        teacher.subject === selectedSubject;

      const matchesClass =
        selectedClass === "All Classes" ||
        teacher.classes.includes(selectedClass);

      const matchesStatus =
        selectedStatus === "All Status" ||
        teacher.status === selectedStatus;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [
    searchTerm,
    selectedSubject,
    selectedClass,
    selectedStatus,
  ]);

  // -----------------------------
  // Pagination
  // -----------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTeachers.length / teachersPerPage)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * teachersPerPage;

  const currentTeachers = filteredTeachers.slice(
    startIndex,
    startIndex + teachersPerPage
  );

  // -----------------------------
  // Reset filters
  // -----------------------------

  function handleReset() {
    setSearchTerm("");
    setSelectedSubject("All Subjects");
    setSelectedClass("All Classes");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  function handleSubjectChange(event) {
    setSelectedSubject(event.target.value);
    setCurrentPage(1);
  }

  function handleClassChange(event) {
    setSelectedClass(event.target.value);
    setCurrentPage(1);
  }

  function handleStatusChange(event) {
    setSelectedStatus(event.target.value);
    setCurrentPage(1);
  }

  // -----------------------------
  // Pagination handlers
  // -----------------------------

  function goToPreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  function goToNextPage() {
    setCurrentPage((page) =>
      Math.min(totalPages, page + 1)
    );
  }

  function goToPage(page) {
    setCurrentPage(page);
  }

  // -----------------------------
  // Action handlers
  // -----------------------------

  function handleView(teacher) {
    console.log("View teacher:", teacher);
  }

  function handleEdit(teacher) {
    console.log("Edit teacher:", teacher);
  }

  function handleDelete(teacher) {
    console.log("Delete teacher:", teacher);
  }

  return (
    <section className="teachers-page">

      {/* --------------------------------
          Page Header
      -------------------------------- */}

      <div className="teachers-page-top">
        <div>
          <h1>Teachers</h1>
          <p>View and manage teacher information.</p>
        </div>

        <button
          type="button"
          className="add-teacher-button"
        >
          <Plus size={21} strokeWidth={2} />
          <span>Add Teacher</span>
        </button>
      </div>

      {/* --------------------------------
          Summary Cards
      -------------------------------- */}

      <div className="teacher-summary-grid">

        <div className="teacher-summary-card teacher-card-blue">
          <div className="teacher-summary-icon">
            <UsersRound size={25} />
          </div>

          <div>
            <p>Total Teachers</p>
            <h2>{totalTeachers}</h2>
          </div>
        </div>

        <div className="teacher-summary-card teacher-card-green">
          <div className="teacher-summary-icon">
            <UserRoundCheck size={25} />
          </div>

          <div>
            <p>Active Teachers</p>
            <h2>{activeTeachers}</h2>
          </div>
        </div>

        <div className="teacher-summary-card teacher-card-red">
          <div className="teacher-summary-icon">
            <UserRoundX size={25} />
          </div>

          <div>
            <p>Inactive Teachers</p>
            <h2>{inactiveTeachers}</h2>
          </div>
        </div>

        <div className="teacher-summary-card teacher-card-yellow">
          <div className="teacher-summary-icon">
            <BookOpen size={25} />
          </div>

          <div>
            <p>Subjects Assigned</p>
            <h2>{subjectsAssigned}</h2>
          </div>
        </div>

      </div>

      {/* --------------------------------
          Management Card
      -------------------------------- */}

      <div className="teachers-management-card">

        {/* Filters */}

        <div className="teachers-filter-bar">

          {/* Search */}

          <div className="teacher-search-box">
            <Search size={21} />

            <input
              type="text"
              placeholder="Search by name, subject or ID..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Subject */}

          <div className="teacher-filter-group">
            <label>Subject</label>

            <div className="teacher-select-wrapper">
              <select
                value={selectedSubject}
                onChange={handleSubjectChange}
                className="teacher-select-box"
              >
                {subjectOptions.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              <ChevronDown size={17} />
            </div>
          </div>

          {/* Class */}

          <div className="teacher-filter-group">
            <label>Class</label>

            <div className="teacher-select-wrapper">
              <select
                value={selectedClass}
                onChange={handleClassChange}
                className="teacher-select-box"
              >
                {classOptions.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>

              <ChevronDown size={17} />
            </div>
          </div>

          {/* Status */}

          <div className="teacher-filter-group">
            <label>Status</label>

            <div className="teacher-select-wrapper">
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="teacher-select-box"
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

              <ChevronDown size={17} />
            </div>
          </div>

          {/* Reset */}

          <button
            type="button"
            className="teacher-reset-button"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>

        </div>

        {/* --------------------------------
            Table
        -------------------------------- */}

        <div className="teachers-table-wrapper">

          <table className="teachers-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Teacher ID</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Classes</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {currentTeachers.length > 0 ? (
                currentTeachers.map((teacher, index) => {

                  const rowNumber =
                    startIndex + index + 1;

                  const initials = teacher.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={teacher.id}>

                      <td>{rowNumber}</td>

                      <td>
                        <span className="teacher-id">
                          {teacher.id}
                        </span>
                      </td>

                      <td>
                        <div className="teacher-name-cell">

                          <div className="teacher-avatar">
                            {initials}
                          </div>

                          <span className="teacher-name">
                            {teacher.name}
                          </span>

                        </div>
                      </td>

                      <td>{teacher.subject}</td>

                      <td>
                        <span className="teacher-classes">
                          {teacher.classes.join(", ")}
                        </span>
                      </td>

                      <td>{teacher.phone}</td>

                      <td>
                        <span
                          className={`teacher-status ${
                            teacher.status === "Active"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >
                          {teacher.status}
                        </span>
                      </td>

                      <td>
                        <div className="teacher-actions">

                          <button
                            type="button"
                            className="teacher-action teacher-view-action"
                            title="View"
                            onClick={() =>
                              handleView(teacher)
                            }
                          >
                            <Eye size={19} />
                          </button>

                          <button
                            type="button"
                            className="teacher-action teacher-edit-action"
                            title="Edit"
                            onClick={() =>
                              handleEdit(teacher)
                            }
                          >
                            <Pencil size={19} />
                          </button>

                          <button
                            type="button"
                            className="teacher-action teacher-delete-action"
                            title="Delete"
                            onClick={() =>
                              handleDelete(teacher)
                            }
                          >
                            <Trash2 size={19} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="teacher-no-results"
                  >
                    No teachers found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* --------------------------------
            Footer + Pagination
        -------------------------------- */}

        <div className="teachers-table-footer">

          <p>
            Showing{" "}
            {filteredTeachers.length === 0
              ? 0
              : startIndex + 1}{" "}
            to{" "}
            {Math.min(
              startIndex + teachersPerPage,
              filteredTeachers.length
            )}{" "}
            of {filteredTeachers.length} teachers
          </p>

          <div className="teacher-pagination">

            <button
              type="button"
              className="teacher-page-button"
              onClick={goToPreviousPage}
              disabled={safeCurrentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={`teacher-page-button ${
                  safeCurrentPage === page
                    ? "active"
                    : ""
                }`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="teacher-page-button"
              onClick={goToNextPage}
              disabled={safeCurrentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Teachers;