import { useState } from "react";
import {
  UsersRound,
  UserRoundCheck,
  BookOpen,
  FileText,
  CalendarDays,
  ChevronDown,
  Download,
} from "lucide-react";

import {
  attendanceReport,
  attendanceChart,
  assignmentReport,
  reportsSummary,
} from "../data/reports";

import "../styles/Reports.css";

function Reports() {
  const [startDate, setStartDate] =
    useState("2024-08-01");

  const [endDate, setEndDate] =
    useState("2024-08-31");

  function formatDate(dateValue) {
    if (!dateValue) return "";

    const date = new Date(
      `${dateValue}T00:00:00`
    );

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  function handleGenerateReport() {
    console.log("Generate report:", {
      startDate,
      endDate,
    });
  }

  return (
    <section className="reports-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="reports-page-top">

        <div>
          <h1>Reports</h1>

          <p>
            View academic and administrative reports.
          </p>
        </div>

        <div className="reports-header-actions">

          {/* DATE RANGE */}

          <div className="reports-date-picker">

            <CalendarDays size={19} />

            <div className="reports-date-values">

              <input
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(event.target.value)
                }
                aria-label="Start date"
              />

              <span>
                {formatDate(startDate)}
              </span>

              <span className="reports-date-separator">
                -
              </span>

              <input
                type="date"
                value={endDate}
                onChange={(event) =>
                  setEndDate(event.target.value)
                }
                aria-label="End date"
              />

              <span>
                {formatDate(endDate)}
              </span>

            </div>

            <ChevronDown size={16} />

          </div>

          {/* GENERATE */}

          <button
            type="button"
            className="generate-report-button"
            onClick={handleGenerateReport}
          >
            <Download size={18} />
            <span>Generate Report</span>
          </button>

        </div>

      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="reports-summary-grid">

        {/* Students */}

        <div className="report-summary-card blue">

          <div className="report-summary-icon">
            <UsersRound size={25} />
          </div>

          <div>
            <span>Total Students</span>
            <strong>
              {reportsSummary.totalStudents}
            </strong>
          </div>

        </div>

        {/* Teachers */}

        <div className="report-summary-card green">

          <div className="report-summary-icon">
            <UserRoundCheck size={25} />
          </div>

          <div>
            <span>Total Teachers</span>
            <strong>
              {reportsSummary.totalTeachers}
            </strong>
          </div>

        </div>

        {/* Classes */}

        <div className="report-summary-card yellow">

          <div className="report-summary-icon">
            <BookOpen size={25} />
          </div>

          <div>
            <span>Total Classes</span>
            <strong>
              {reportsSummary.totalClasses}
            </strong>
          </div>

        </div>

        {/* Assignments */}

        <div className="report-summary-card purple">

          <div className="report-summary-icon">
            <FileText size={25} />
          </div>

          <div>
            <span>Total Assignments</span>
            <strong>
              {reportsSummary.totalAssignments}
            </strong>
          </div>

        </div>

      </div>

      {/* =====================================================
          CHARTS ROW
      ===================================================== */}

      <div className="reports-charts-grid">

        {/* ===================================================
            ATTENDANCE OVERVIEW
        =================================================== */}

        <div className="report-chart-card">

          <div className="report-card-header">

            <h2>Attendance Overview</h2>

            <div className="chart-legend">

              <span>
                <i className="legend-dot present"></i>
                Present
              </span>

              <span>
                <i className="legend-dot absent"></i>
                Absent
              </span>

            </div>

          </div>

          <div className="attendance-chart">

            {/* Y AXIS */}

            <div className="attendance-y-axis">

              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>

            </div>

            {/* CHART AREA */}

            <div className="attendance-chart-area">

              <div className="chart-grid-lines">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>

              <div className="attendance-bars">

                {attendanceChart.map((item) => (
                  <div
                    className="attendance-bar-group"
                    key={item.className}
                  >

                    <div className="attendance-bar-values">

                      <div
                        className="attendance-bar present"
                        style={{
                          height: `${item.present}%`,
                        }}
                      ></div>

                      <div
                        className="attendance-bar absent"
                        style={{
                          height: `${item.absent}%`,
                        }}
                      ></div>

                    </div>

                    <span className="attendance-class-label">
                      {item.className}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            ASSIGNMENT COMPLETION
        =================================================== */}

        <div className="report-chart-card assignment-chart-card">

          <div className="report-card-header">

            <h2>Assignment Completion</h2>

            <div className="chart-legend">

              <span>
                <i className="legend-dot completed"></i>
                Completed
              </span>

              <span>
                <i className="legend-dot pending"></i>
                Pending
              </span>

            </div>

          </div>

          <div className="assignment-completion-content">

            {/* DONUT */}

            <div className="assignment-donut-wrapper">

              <div
                className="assignment-donut"
                style={{
                  background:
                    "conic-gradient(#398df5 0deg 240deg, #d7b7ff 240deg 360deg)",
                }}
              >

                <div className="assignment-donut-center">

                  <strong>67%</strong>

                  <span>
                    Completed
                  </span>

                </div>

              </div>

            </div>

            {/* LEGEND DETAILS */}

            <div className="assignment-completion-details">

              <div className="completion-detail">

                <div>
                  <i className="completion-detail-dot completed"></i>
                  <span>Completed</span>
                </div>

                <strong>
                  {reportsSummary.completedAssignments}
                </strong>

              </div>

              <div className="completion-detail">

                <div>
                  <i className="completion-detail-dot pending"></i>
                  <span>Pending</span>
                </div>

                <strong>
                  {reportsSummary.pendingAssignments}
                </strong>

              </div>

              <div className="completion-detail">

                <div>
                  <i className="completion-detail-dot total"></i>
                  <span>Total Assignments</span>
                </div>

                <strong>
                  {reportsSummary.totalAssignments}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          REPORT TABLES
      ===================================================== */}

      <div className="reports-tables-grid">

        {/* ===================================================
            ATTENDANCE REPORT
        =================================================== */}

        <div className="report-table-card">

          <div className="report-table-header">

            <h2>Attendance Report</h2>

            <button
              type="button"
              onClick={() =>
                console.log("View all attendance")
              }
            >
              View All
            </button>

          </div>

          <div className="report-table-wrapper">

            <table className="report-table">

              <thead>

                <tr>
                  <th>#</th>
                  <th>Class</th>
                  <th>Total Students</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Attendance %</th>
                </tr>

              </thead>

              <tbody>

                {attendanceReport.map((item) => (
                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.className}</td>

                    <td>
                      {item.totalStudents}
                    </td>

                    <td>
                      {item.present}
                    </td>

                    <td>
                      {item.absent}
                    </td>

                    <td>
                      <span className="percentage-badge green">
                        {item.attendance}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* ===================================================
            ASSIGNMENT REPORT
        =================================================== */}

        <div className="report-table-card">

          <div className="report-table-header">

            <h2>Assignment Report</h2>

            <button
              type="button"
              onClick={() =>
                console.log("View all assignments")
              }
            >
              View All
            </button>

          </div>

          <div className="report-table-wrapper">

            <table className="report-table">

              <thead>

                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Total</th>
                  <th>Completed</th>
                  <th>Pending</th>
                  <th>Completion %</th>
                </tr>

              </thead>

              <tbody>

                {assignmentReport.map((item) => (
                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.subject}</td>

                    <td>{item.total}</td>

                    <td>{item.completed}</td>

                    <td>{item.pending}</td>

                    <td>

                      <span
                        className={`percentage-badge ${
                          item.completion === "50%"
                            ? "red"
                            : "green"
                        }`}
                      >
                        {item.completion}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Reports;