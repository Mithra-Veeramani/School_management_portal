import { useMemo, useState } from "react";
import {
  School,
  UsersRound,
  BookOpen,
  GraduationCap,
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

import classes from "../data/classes";
import "../styles/Classes.css";

function Classes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSection, setSelectedSection] =
    useState("All Sections");
  const [selectedSubject, setSelectedSubject] =
    useState("All Subjects");
  const [currentPage, setCurrentPage] = useState(1);

  const classesPerPage = 8;

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalClasses = classes.length;

  const totalSections = 28;

  const totalSubjects = 18;

  const totalStudents = 320;

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const classOptions = useMemo(() => {
    return [
      "All Classes",
      ...classes.map((item) => item.className),
    ];
  }, []);

  const sectionOptions = useMemo(() => {
    const sections = [
      ...new Set(
        classes.flatMap((item) => item.sections)
      ),
    ];

    return ["All Sections", ...sections];
  }, []);

  const subjectOptions = useMemo(() => {
    const subjects = [
      ...new Set(
        classes.flatMap((item) => item.subjects)
      ),
    ];

    return ["All Subjects", ...subjects];
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredClasses = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return classes.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.className.toLowerCase().includes(search) ||
        item.classTeacher.toLowerCase().includes(search);

      const matchesClass =
        selectedClass === "All Classes" ||
        item.className === selectedClass;

      const matchesSection =
        selectedSection === "All Sections" ||
        item.sections.includes(selectedSection);

      const matchesSubject =
        selectedSubject === "All Subjects" ||
        item.subjects.includes(selectedSubject);

      return (
        matchesSearch &&
        matchesClass &&
        matchesSection &&
        matchesSubject
      );
    });
  }, [
    searchTerm,
    selectedClass,
    selectedSection,
    selectedSubject,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredClasses.length / classesPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * classesPerPage;

  const currentClasses = filteredClasses.slice(
    startIndex,
    startIndex + classesPerPage
  );

  /* =========================================================
     RESET
  ========================================================= */

  function handleReset() {
    setSearchTerm("");
    setSelectedClass("All Classes");
    setSelectedSection("All Sections");
    setSelectedSubject("All Subjects");
    setCurrentPage(1);
  }

  /* =========================================================
     ACTIONS
  ========================================================= */

  function handleView(item) {
    console.log("View class:", item);
  }

  function handleEdit(item) {
    console.log("Edit class:", item);
  }

  function handleDelete(item) {
    console.log("Delete class:", item);
  }

  return (
    <section className="classes-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="classes-page-top">
        <div>
          <h1>Classes</h1>
          <p>
            Manage classes, sections and subjects.
          </p>
        </div>

        <button
          type="button"
          className="add-class-button"
        >
          <Plus size={19} />
          <span>Add Class</span>
        </button>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="class-summary-grid">

        {/* Total Classes */}

        <div className="class-summary-card blue">
          <div className="class-summary-icon">
            <School size={25} />
          </div>

          <div>
            <span>Total Classes</span>
            <strong>{totalClasses}</strong>
          </div>
        </div>

        {/* Total Sections */}

        <div className="class-summary-card green">
          <div className="class-summary-icon">
            <UsersRound size={25} />
          </div>

          <div>
            <span>Total Sections</span>
            <strong>{totalSections}</strong>
          </div>
        </div>

        {/* Total Subjects */}

        <div className="class-summary-card yellow">
          <div className="class-summary-icon">
            <BookOpen size={25} />
          </div>

          <div>
            <span>Total Subjects</span>
            <strong>{totalSubjects}</strong>
          </div>
        </div>

        {/* Total Students */}

        <div className="class-summary-card purple">
          <div className="class-summary-icon">
            <GraduationCap size={25} />
          </div>

          <div>
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
          </div>
        </div>

      </div>

      {/* =====================================================
          MANAGEMENT CARD
      ===================================================== */}

      <div className="classes-management-card">

        {/* ===================================================
            FILTER BAR
        =================================================== */}

        <div className="classes-filter-bar">

          {/* Search */}

          <div className="class-search-box">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search by class name..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Class */}

          <div className="class-select-box">
            <label>Class</label>

            <div className="class-select-wrapper">
              <select
                value={selectedClass}
                onChange={(event) => {
                  setSelectedClass(event.target.value);
                  setCurrentPage(1);
                }}
              >
                {classOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          {/* Section */}

          <div className="class-select-box">
            <label>Section</label>

            <div className="class-select-wrapper">
              <select
                value={selectedSection}
                onChange={(event) => {
                  setSelectedSection(event.target.value);
                  setCurrentPage(1);
                }}
              >
                {sectionOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          {/* Subject */}

          <div className="class-select-box">
            <label>Subject</label>

            <div className="class-select-wrapper">
              <select
                value={selectedSubject}
                onChange={(event) => {
                  setSelectedSubject(event.target.value);
                  setCurrentPage(1);
                }}
              >
                {subjectOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          {/* Reset */}

          <button
            type="button"
            className="class-reset-button"
            onClick={handleReset}
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="classes-table-wrapper">

          <table className="classes-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Class Name</th>
                <th>Sections</th>
                <th>Subjects</th>
                <th>Total Students</th>
                <th>Class Teacher</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {currentClasses.length > 0 ? (
                currentClasses.map((item, index) => (
                  <tr key={item.id}>

                    <td>
                      {startIndex + index + 1}
                    </td>

                    <td>
                      <span className="class-name">
                        {item.className}
                      </span>
                    </td>

                    <td>
                      {item.sections.join(", ")}
                    </td>

                    <td>
                      <span className="subjects-count">
                        {item.subjects.length} Subjects
                      </span>
                    </td>

                    <td>
                      {item.totalStudents}
                    </td>

                    <td>
                      {item.classTeacher}
                    </td>

                    <td>
                      <span
                        className={`class-status ${
                          item.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="class-actions">

                        <button
                          type="button"
                          className="class-action view"
                          title="View"
                          onClick={() =>
                            handleView(item)
                          }
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          type="button"
                          className="class-action edit"
                          title="Edit"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          className="class-action delete"
                          title="Delete"
                          onClick={() =>
                            handleDelete(item)
                          }
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="class-no-results"
                  >
                    <strong>
                      No classes found
                    </strong>

                    <span>
                      Try changing your search or filters.
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

        <div className="classes-table-footer">

          <span>
            Showing{" "}
            {filteredClasses.length === 0
              ? 0
              : startIndex + 1}{" "}
            to{" "}
            {Math.min(
              startIndex + classesPerPage,
              filteredClasses.length
            )}{" "}
            of {filteredClasses.length} classes
          </span>

          <div className="class-pagination">

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

export default Classes;