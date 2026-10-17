import { useMemo, useState } from "react";
import {
  UsersRound,
  GraduationCap,
  UserRoundX,
  School,
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

import students from "../data/students";
import "../styles/Students.css";

function Students({ onViewStudent }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSection, setSelectedSection] = useState("All Sections");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const [studentForm, setStudentForm] = useState({
    id: "",
    name: "",
    className: "",
    section: "",
    phone: "",
    status: "Active",
  });

  const [formErrors, setFormErrors] = useState({});

  const studentsPerPage = 8;

  /* ---------------------------------------------------------
     SUMMARY VALUES
     --------------------------------------------------------- */

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const totalClasses = new Set(
    students.map((student) => student.className)
  ).size;

  /* ---------------------------------------------------------
     FILTER OPTIONS
     --------------------------------------------------------- */

  const classOptions = useMemo(() => {
    return [
      "All Classes",
      ...new Set(students.map((student) => student.className)),
    ];
  }, []);

  const sectionOptions = useMemo(() => {
    return [
      "All Sections",
      ...new Set(students.map((student) => student.section)),
    ];
  }, []);

  /* ---------------------------------------------------------
     SEARCH + FILTER
     --------------------------------------------------------- */

  const filteredStudents = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search) ||
        student.id.toLowerCase().includes(search);

      const matchesClass =
        selectedClass === "All Classes" ||
        student.className === selectedClass;

      const matchesSection =
        selectedSection === "All Sections" ||
        student.section === selectedSection;

      const matchesStatus =
        selectedStatus === "All Status" ||
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

  /* ---------------------------------------------------------
     PAGINATION
     --------------------------------------------------------- */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * studentsPerPage;

  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  /* ---------------------------------------------------------
     HANDLERS
     --------------------------------------------------------- */

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  function handleClassChange(event) {
    setSelectedClass(event.target.value);
    setCurrentPage(1);
  }

  function handleSectionChange(event) {
    setSelectedSection(event.target.value);
    setCurrentPage(1);
  }

  function handleStatusChange(event) {
    setSelectedStatus(event.target.value);
    setCurrentPage(1);
  }

  function handleReset() {
    setSearchTerm("");
    setSelectedClass("All Classes");
    setSelectedSection("All Sections");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  }

  function handleView(student) {
    if (onViewStudent) {
      onViewStudent(student);
    }
  }

  function handleEdit(student) {
    console.log("Edit student:", student);
  }

  function handleDelete(student) {
    console.log("Delete student:", student);
  }

  function handleAddStudent() {
    setIsAddStudentOpen(true);
    // console.log("Add student");
  }

  return (
    <section className="students-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="students-page-top">

        <div>
          <h1>Students</h1>

          <p>
            View and manage student information.
          </p>
        </div>

        <button
          type="button"
          className="add-student-button"
          onClick={handleAddStudent}
        >
          <Plus size={19} />
          <span>Add Student</span>
        </button>

      </div>


      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="student-summary-grid">

        <article className="student-summary-card blue">
          <div className="student-summary-icon">
            <UsersRound size={25} />
          </div>

          <div>
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
          </div>
        </article>


        <article className="student-summary-card green">
          <div className="student-summary-icon">
            <GraduationCap size={25} />
          </div>

          <div>
            <span>Active Students</span>
            <strong>{activeStudents}</strong>
          </div>
        </article>


        <article className="student-summary-card red">
          <div className="student-summary-icon">
            <UserRoundX size={25} />
          </div>

          <div>
            <span>Inactive Students</span>
            <strong>{inactiveStudents}</strong>
          </div>
        </article>


        <article className="student-summary-card yellow">
          <div className="student-summary-icon">
            <School size={25} />
          </div>

          <div>
            <span>Classes</span>
            <strong>{totalClasses}</strong>
          </div>
        </article>

      </div>


      {/* =====================================================
          STUDENT TABLE CARD
          ===================================================== */}

      <div className="students-management-card">

        {/* FILTER BAR */}

        <div className="students-filter-bar">

          <div className="student-search-box">
            <Search size={19} />

            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or ID..."
              aria-label="Search students"
            />
          </div>


          <div className="student-select-box">

            <label>Class</label>

            <div className="select-wrapper">
              <select
                value={selectedClass}
                onChange={handleClassChange}
              >
                {classOptions.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>

          </div>


          <div className="student-select-box">

            <label>Section</label>

            <div className="select-wrapper">
              <select
                value={selectedSection}
                onChange={handleSectionChange}
              >
                {sectionOptions.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>

          </div>


          <div className="student-select-box">

            <label>Status</label>

            <div className="select-wrapper">
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <ChevronDown size={16} />
            </div>

          </div>


          <button
            type="button"
            className="student-reset-button"
            onClick={handleReset}
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

        </div>


        {/* ===================================================
            TABLE
            =================================================== */}

        <div className="students-table-wrapper">

          <table className="students-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Student ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>

              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student, index) => {

                  const avatarLetter =
                    student.name.charAt(0).toUpperCase();

                  return (
                    <tr key={student.id}>

                      <td>
                        {startIndex + index + 1}
                      </td>


                      <td>
                        <span className="student-id">
                          {student.id}
                        </span>
                      </td>


                      <td>
                        <div className="student-name">

                          <div className="student-avatar">
                            {avatarLetter}
                          </div>

                          <span>
                            {student.name}
                          </span>

                        </div>
                      </td>


                      <td>
                        {student.className.replace(
                          "Class ",
                          ""
                        )}
                      </td>


                      <td>
                        {student.section}
                      </td>


                      <td>
                        {student.phone}
                      </td>


                      <td>
                        <span
                          className={`student-status ${student.status.toLowerCase()
                            }`}
                        >
                          {student.status}
                        </span>
                      </td>


                      <td>

                        <div className="student-actions">

                          <button
                            type="button"
                            className="student-action view"
                            title="View student"
                            onClick={() =>
                              handleView(student)
                            }
                          >
                            <Eye size={18} />
                          </button>


                          <button
                            type="button"
                            className="student-action edit"
                            title="Edit student"
                            onClick={() =>
                              handleEdit(student)
                            }
                          >
                            <Pencil size={18} />
                          </button>


                          <button
                            type="button"
                            className="student-action delete"
                            title="Delete student"
                            onClick={() =>
                              handleDelete(student)
                            }
                          >
                            <Trash2 size={18} />
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
                    className="student-no-results"
                  >
                    <Search size={28} />

                    <strong>No students found</strong>

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
            TABLE FOOTER
            =================================================== */}

        <div className="students-table-footer">

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


          <div className="pagination">

            <button
              type="button"
              disabled={safeCurrentPage === 1}
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
                  safeCurrentPage === page
                    ? "active"
                    : ""
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>

            ))}


            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
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

export default Students;