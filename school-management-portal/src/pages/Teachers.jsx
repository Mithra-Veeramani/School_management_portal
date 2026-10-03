// import { useMemo, useState } from "react";
// import {
//   UsersRound,
//   UserRoundCheck,
//   UserRoundX,
//   BookOpen,
//   Search,
//   ChevronDown,
//   RotateCcw,
//   Eye,
//   Pencil,
//   Trash2,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import teachers from "../data/teachers";
// import "../styles/Teachers.css";

// function Teachers() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("All Subjects");
//   const [selectedClass, setSelectedClass] = useState("All Classes");
//   const [selectedStatus, setSelectedStatus] = useState("All Status");
//   const [currentPage, setCurrentPage] = useState(1);

//   const teachersPerPage = 8;

//   /* =========================================================
//      SUMMARY VALUES
//      ========================================================= */

//   const totalTeachers = teachers.length;

//   const activeTeachers = teachers.filter(
//     (teacher) => teacher.status === "Active"
//   ).length;

//   const inactiveTeachers = teachers.filter(
//     (teacher) => teacher.status === "Inactive"
//   ).length;

//   const subjectsAssigned = new Set(
//     teachers.map((teacher) => teacher.subject)
//   ).size;

//   /* =========================================================
//      FILTER OPTIONS
//      ========================================================= */

//   const subjectOptions = useMemo(() => {
//     return [
//       "All Subjects",
//       ...new Set(teachers.map((teacher) => teacher.subject)),
//     ];
//   }, []);

//   const classOptions = useMemo(() => {
//     const classes = teachers.flatMap((teacher) => teacher.classes);

//     return [
//       "All Classes",
//       ...new Set(classes),
//     ];
//   }, []);

//   /* =========================================================
//      SEARCH + FILTER
//      ========================================================= */

//   const filteredTeachers = useMemo(() => {
//     const search = searchTerm.toLowerCase().trim();

//     return teachers.filter((teacher) => {
//       const matchesSearch =
//         teacher.name.toLowerCase().includes(search) ||
//         teacher.id.toLowerCase().includes(search) ||
//         teacher.subject.toLowerCase().includes(search);

//       const matchesSubject =
//         selectedSubject === "All Subjects" ||
//         teacher.subject === selectedSubject;

//       const matchesClass =
//         selectedClass === "All Classes" ||
//         teacher.classes.includes(selectedClass);

//       const matchesStatus =
//         selectedStatus === "All Status" ||
//         teacher.status === selectedStatus;

//       return (
//         matchesSearch &&
//         matchesSubject &&
//         matchesClass &&
//         matchesStatus
//       );
//     });
//   }, [
//     searchTerm,
//     selectedSubject,
//     selectedClass,
//     selectedStatus,
//   ]);

//   /* =========================================================
//      PAGINATION
//      ========================================================= */

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredTeachers.length / teachersPerPage)
//   );

//   const safeCurrentPage = Math.min(
//     currentPage,
//     totalPages
//   );

//   const startIndex =
//     (safeCurrentPage - 1) * teachersPerPage;

//   const paginatedTeachers = filteredTeachers.slice(
//     startIndex,
//     startIndex + teachersPerPage
//   );

//   /* =========================================================
//      HANDLERS
//      ========================================================= */

//   function handleSearchChange(event) {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   }

//   function handleSubjectChange(event) {
//     setSelectedSubject(event.target.value);
//     setCurrentPage(1);
//   }

//   function handleClassChange(event) {
//     setSelectedClass(event.target.value);
//     setCurrentPage(1);
//   }

//   function handleStatusChange(event) {
//     setSelectedStatus(event.target.value);
//     setCurrentPage(1);
//   }

//   function handleReset() {
//     setSearchTerm("");
//     setSelectedSubject("All Subjects");
//     setSelectedClass("All Classes");
//     setSelectedStatus("All Status");
//     setCurrentPage(1);
//   }

//   function handleAddTeacher() {
//     console.log("Add teacher");
//   }

//   function handleView(teacher) {
//     console.log("View teacher:", teacher);
//   }

//   function handleEdit(teacher) {
//     console.log("Edit teacher:", teacher);
//   }

//   function handleDelete(teacher) {
//     console.log("Delete teacher:", teacher);
//   }

//   return (
//     <section className="teachers-page">

//       {/* =====================================================
//           PAGE HEADER
//           ===================================================== */}

//       <div className="teachers-page-top">
//         <div>
//           <h1>Teachers</h1>

//           <p>
//             View and manage teacher information.
//           </p>
//         </div>

//         <button
//           type="button"
//           className="add-teacher-button"
//           onClick={handleAddTeacher}
//         >
//           <Plus size={19} />
//           <span>Add Teacher</span>
//         </button>
//       </div>


//       {/* =====================================================
//           SUMMARY CARDS
//           ===================================================== */}

//       <div className="teacher-summary-grid">

//         <article className="teacher-summary-card blue">
//           <div className="teacher-summary-icon">
//             <UsersRound size={25} />
//           </div>

//           <div>
//             <span>Total Teachers</span>
//             <strong>{totalTeachers}</strong>
//           </div>
//         </article>


//         <article className="teacher-summary-card green">
//           <div className="teacher-summary-icon">
//             <UserRoundCheck size={25} />
//           </div>

//           <div>
//             <span>Active Teachers</span>
//             <strong>{activeTeachers}</strong>
//           </div>
//         </article>


//         <article className="teacher-summary-card red">
//           <div className="teacher-summary-icon">
//             <UserRoundX size={25} />
//           </div>

//           <div>
//             <span>Inactive Teachers</span>
//             <strong>{inactiveTeachers}</strong>
//           </div>
//         </article>


//         <article className="teacher-summary-card yellow">
//           <div className="teacher-summary-icon">
//             <BookOpen size={25} />
//           </div>

//           <div>
//             <span>Subjects Assigned</span>
//             <strong>{subjectsAssigned}</strong>
//           </div>
//         </article>

//       </div>


//       {/* =====================================================
//           TEACHER MANAGEMENT CARD
//           ===================================================== */}

//       <div className="teachers-management-card">

//         {/* FILTER BAR */}

//         <div className="teachers-filter-bar">

//           <div className="teacher-search-box">
//             <Search size={19} />

//             <input
//               type="search"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Search by name, subject or ID..."
//               aria-label="Search teachers"
//             />
//           </div>


//           <div className="teacher-select-box">
//             <label>Subject</label>

//             <div className="teacher-select-wrapper">
//               <select
//                 value={selectedSubject}
//                 onChange={handleSubjectChange}
//               >
//                 {subjectOptions.map((subject) => (
//                   <option key={subject} value={subject}>
//                     {subject}
//                   </option>
//                 ))}
//               </select>

//               <ChevronDown size={16} />
//             </div>
//           </div>


//           <div className="teacher-select-box">
//             <label>Class</label>

//             <div className="teacher-select-wrapper">
//               <select
//                 value={selectedClass}
//                 onChange={handleClassChange}
//               >
//                 {classOptions.map((className) => (
//                   <option key={className} value={className}>
//                     {className}
//                   </option>
//                 ))}
//               </select>

//               <ChevronDown size={16} />
//             </div>
//           </div>


//           <div className="teacher-select-box">
//             <label>Status</label>

//             <div className="teacher-select-wrapper">
//               <select
//                 value={selectedStatus}
//                 onChange={handleStatusChange}
//               >
//                 <option value="All Status">
//                   All Status
//                 </option>

//                 <option value="Active">
//                   Active
//                 </option>

//                 <option value="Inactive">
//                   Inactive
//                 </option>
//               </select>

//               <ChevronDown size={16} />
//             </div>
//           </div>


//           <button
//             type="button"
//             className="teacher-reset-button"
//             onClick={handleReset}
//           >
//             <RotateCcw size={15} />
//             <span>Reset</span>
//           </button>

//         </div>


//         {/* ===================================================
//             TEACHER TABLE
//             =================================================== */}

//         <div className="teachers-table-wrapper">

//           <table className="teachers-table">

//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Teacher ID</th>
//                 <th>Name</th>
//                 <th>Subject</th>
//                 <th>Classes</th>
//                 <th>Contact</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>


//             <tbody>

//               {paginatedTeachers.length > 0 ? (
//                 paginatedTeachers.map((teacher, index) => {

//                   const avatarLetter =
//                     teacher.name.charAt(0).toUpperCase();

//                   return (
//                     <tr key={teacher.id}>

//                       <td>
//                         {startIndex + index + 1}
//                       </td>


//                       <td>
//                         <span className="teacher-id">
//                           {teacher.id}
//                         </span>
//                       </td>


//                       <td>
//                         <div className="teacher-name">

//                           <div className="teacher-avatar">
//                             {avatarLetter}
//                           </div>

//                           <span>
//                             {teacher.name}
//                           </span>

//                         </div>
//                       </td>


//                       <td>
//                         {teacher.subject}
//                       </td>


//                       <td>
//                         {teacher.classes.join(", ")}
//                       </td>


//                       <td>
//                         {teacher.phone}
//                       </td>


//                       <td>
//                         <span
//                           className={`teacher-status ${
//                             teacher.status.toLowerCase()
//                           }`}
//                         >
//                           {teacher.status}
//                         </span>
//                       </td>


//                       <td>

//                         <div className="teacher-actions">

//                           <button
//                             type="button"
//                             className="teacher-action view"
//                             title="View teacher"
//                             onClick={() =>
//                               handleView(teacher)
//                             }
//                           >
//                             <Eye size={18} />
//                           </button>


//                           <button
//                             type="button"
//                             className="teacher-action edit"
//                             title="Edit teacher"
//                             onClick={() =>
//                               handleEdit(teacher)
//                             }
//                           >
//                             <Pencil size={18} />
//                           </button>


//                           <button
//                             type="button"
//                             className="teacher-action delete"
//                             title="Delete teacher"
//                             onClick={() =>
//                               handleDelete(teacher)
//                             }
//                           >
//                             <Trash2 size={18} />
//                           </button>

//                         </div>

//                       </td>

//                     </tr>
//                   );
//                 })
//               ) : (

//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="teacher-no-results"
//                   >
//                     <Search size={28} />

//                     <strong>
//                       No teachers found
//                     </strong>

//                     <span>
//                       Try changing your search or filters.
//                     </span>
//                   </td>
//                 </tr>

//               )}

//             </tbody>

//           </table>

//         </div>


//         {/* ===================================================
//             TABLE FOOTER
//             =================================================== */}

//         <div className="teachers-table-footer">

//           <span>
//             Showing{" "}
//             {filteredTeachers.length === 0
//               ? 0
//               : startIndex + 1}{" "}
//             to{" "}
//             {Math.min(
//               startIndex + teachersPerPage,
//               filteredTeachers.length
//             )}{" "}
//             of {filteredTeachers.length} teachers
//           </span>


//           <div className="teacher-pagination">

//             <button
//               type="button"
//               disabled={safeCurrentPage === 1}
//               onClick={() =>
//                 setCurrentPage((page) =>
//                   Math.max(1, page - 1)
//                 )
//               }
//             >
//               <ChevronLeft size={17} />
//             </button>


//             {Array.from(
//               { length: totalPages },
//               (_, index) => index + 1
//             ).map((page) => (

//               <button
//                 type="button"
//                 key={page}
//                 className={
//                   safeCurrentPage === page
//                     ? "active"
//                     : ""
//                 }
//                 onClick={() =>
//                   setCurrentPage(page)
//                 }
//               >
//                 {page}
//               </button>

//             ))}


//             <button
//               type="button"
//               disabled={
//                 safeCurrentPage === totalPages
//               }
//               onClick={() =>
//                 setCurrentPage((page) =>
//                   Math.min(totalPages, page + 1)
//                 )
//               }
//             >
//               <ChevronRight size={17} />
//             </button>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default Teachers;