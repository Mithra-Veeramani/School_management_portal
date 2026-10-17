import {
  ArrowLeft,
  UserRound,
  Phone,
  GraduationCap,
  CalendarCheck,
  ClipboardList,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import "../styles/StudentProfile.css";

function StudentProfile({ student, onBack }) {
  if (!student) {
    return (
      <section className="student-profile-page">
        <button
          type="button"
          className="student-profile-back-button"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back to Students
        </button>

        <div className="student-profile-empty">
          <UserRound size={40} />
          <h2>Student not found</h2>
          <p>Please select a student from the Students page.</p>
        </div>
      </section>
    );
  }

  const attendance = Number(student.attendance) || 0;

  return (
    <section className="student-profile-page">

      {/* PAGE HEADER */}

      <div className="student-profile-header">

        <div>
          <button
            type="button"
            className="student-profile-back-button"
            onClick={onBack}
          >
            <ArrowLeft size={17} />
            Back to Students
          </button>

          <h1>Student Profile</h1>

          <p>
            View student information, attendance and assignment
            summary.
          </p>
        </div>

      </div>

      {/* BASIC INFORMATION */}

      <div className="student-profile-card">

        <div className="student-profile-main">

          <div className="student-profile-avatar">
            {student.name.charAt(0).toUpperCase()}
          </div>

          <div className="student-profile-name">

            <h2>{student.name}</h2>

            <span>{student.id}</span>

            <div className="student-profile-status-row">

              <span
                className={`student-profile-status ${student.status.toLowerCase()}`}
              >
                {student.status}
              </span>

            </div>

          </div>

        </div>

        <div className="student-profile-details">

          <div className="student-detail-item">
            <GraduationCap size={18} />

            <div>
              <span>Class</span>
              <strong>{student.className}</strong>
            </div>
          </div>

          <div className="student-detail-item">
            <UserRound size={18} />

            <div>
              <span>Section</span>
              <strong>{student.section}</strong>
            </div>
          </div>

          <div className="student-detail-item">
            <Phone size={18} />

            <div>
              <span>Contact</span>
              <strong>{student.phone}</strong>
            </div>
          </div>

        </div>

      </div>

      {/* SUMMARY CARDS */}

      <div className="student-profile-summary-grid">

        {/* ATTENDANCE */}

        <article className="student-profile-summary-card blue">

          <div className="student-profile-summary-icon">
            <CalendarCheck size={24} />
          </div>

          <div>
            <span>Attendance</span>
            <strong>{attendance}%</strong>
          </div>

        </article>

        {/* ASSIGNMENTS */}

        <article className="student-profile-summary-card green">

          <div className="student-profile-summary-icon">
            <ClipboardList size={24} />
          </div>

          <div>
            <span>Total Assignments</span>
            <strong>12</strong>
          </div>

        </article>

        {/* COMPLETED */}

        <article className="student-profile-summary-card purple">

          <div className="student-profile-summary-icon">
            <CheckCircle2 size={24} />
          </div>

          <div>
            <span>Completed</span>
            <strong>8</strong>
          </div>

        </article>

        {/* PENDING */}

        <article className="student-profile-summary-card yellow">

          <div className="student-profile-summary-icon">
            <Clock3 size={24} />
          </div>

          <div>
            <span>Pending</span>
            <strong>4</strong>
          </div>

        </article>

      </div>

      {/* ATTENDANCE + ASSIGNMENTS */}

      <div className="student-profile-content-grid">

        {/* ATTENDANCE */}

        <div className="student-profile-section-card">

          <div className="student-profile-section-header">

            <div className="student-profile-section-icon">
              <CalendarCheck size={20} />
            </div>

            <div>
              <h2>Attendance Summary</h2>
              <p>Student attendance overview.</p>
            </div>

          </div>

          <div className="student-profile-attendance">

            <div className="attendance-progress">

              <div
                className="attendance-progress-bar"
                style={{
                  width: `${Math.min(attendance, 100)}%`,
                }}
              />

            </div>

            <div className="attendance-progress-info">
              <span>Overall Attendance</span>
              <strong>{attendance}%</strong>
            </div>

          </div>

          <div className="attendance-stat-grid">

            <div>
              <span>Present</span>
              <strong>48</strong>
            </div>

            <div>
              <span>Absent</span>
              <strong>8</strong>
            </div>

            <div>
              <span>Total Days</span>
              <strong>56</strong>
            </div>

          </div>

        </div>

        {/* ASSIGNMENTS */}

        <div className="student-profile-section-card">

          <div className="student-profile-section-header">

            <div className="student-profile-section-icon">
              <ClipboardList size={20} />
            </div>

            <div>
              <h2>Assignment Summary</h2>
              <p>Student assignment progress.</p>
            </div>

          </div>

          <div className="assignment-summary-list">

            <div className="assignment-summary-row">

              <div>
                <CheckCircle2 size={18} />
                <span>Completed</span>
              </div>

              <strong>8</strong>

            </div>

            <div className="assignment-summary-row">

              <div>
                <Clock3 size={18} />
                <span>Pending</span>
              </div>

              <strong>4</strong>

            </div>

            <div className="assignment-summary-row total">

              <div>
                <ClipboardList size={18} />
                <span>Total Assignments</span>
              </div>

              <strong>12</strong>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default StudentProfile;