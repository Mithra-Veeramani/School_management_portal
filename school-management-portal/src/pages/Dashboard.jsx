import {
    UsersRound,
    GraduationCap,
    BookOpen,
    FileText,
    CalendarCheck,
    Clock,
    UserPlus,
    ClipboardCheck,
    ArrowRight,
    Plus,
    UserRoundPlus,
    School,
    CalendarCheck2,
    FilePlus,
    BarChart3,
} from "lucide-react";


import SummaryCard from "../components/SummaryCard";
import "../styles/Dashboard.css";

const summaryData = [
    {
        title: "Total Students",
        value: "520",
        icon: UsersRound,
        color: "#2878ed",
        description: "Currently enrolled students",
    },
    {
        title: "Total Teachers",
        value: "35",
        icon: GraduationCap,
        color: "#16a36a",
        description: "Active teaching staff",
    },
    {
        title: "Total Classes",
        value: "18",
        icon: BookOpen,
        color: "#8b5cf6",
        description: "Classes and sections",
    },
    {
        title: "Assignments",
        value: "12",
        icon: FileText,
        color: "#e99a20",
        description: "Assignments to manage",
    },
];
const activities = [
    {
        title: "New student registered",
        detail: "Arjun Kumar · Class 6",
        time: "Today",
        icon: UserPlus,
        color: "#16a36a",
    },
    {
        title: "Attendance updated",
        detail: "Class 7A · 32 students",
        time: "Today",
        icon: ClipboardCheck,
        color: "#2878ed",
    },
    {
        title: "Assignment created",
        detail: "Mathematics · Class 8",
        time: "Yesterday",
        icon: FileText,
        color: "#8b5cf6",
    },
    {
        title: "New teacher added",
        detail: "Vijay Mallik-Mathematics",
        time: "Today",
        icon: UserPlus,
        color: "#8b5cf6",
    },
    {
        title: "Assignment submitted",
        detail: "Priya Mehta - Science",
        time: "Today",
        icon: FileText,
        color: "#8b5cf6",
    },
];
const quickActions = [
    {
        title: "Add Student",
        icon: UserRoundPlus,
        color: "#2878ed",
    },
    {
        title: "Add Teacher",
        icon: Plus,
        color: "#16a36a",
    },
    {
        title: "Add Class",
        icon: School,
        color: "#e99a20",
    },
    {
        title: "Mark Attendance",
        icon: CalendarCheck2,
        color: "#8b5cf6",
    },
    {
        title: "Create Assignment",
        icon: FilePlus,
        color: "#ef6b73",
    },
    {
        title: "View Reports",
        icon: BarChart3,
        color: "#2878ed",
    },
];

function Dashboard() {
    return (
        <div className="dashboard-page">
            <section className="summary-grid">
                {summaryData.map((item) => (
                    <SummaryCard
                        key={item.title}
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                        color={item.color}
                        description={item.description}
                    />
                ))}
            </section>

            <section className="dashboard-lower-grid">

                {/* Attendance Overview */}
                <article className="dashboard-panel attendance-panel">
                    <div className="panel-heading">
                        <div>
                            <h2>Attendance Overview</h2>
                            <p>Today's student attendance summary</p>
                        </div>

                        <span className="panel-heading-icon">
                            <CalendarCheck size={20} />
                        </span>
                    </div>

                    <div className="attendance-percentage">
                        <div>
                            <h3>92%</h3>
                            <p>Overall attendance</p>
                        </div>

                        <span className="attendance-status">
                            Good
                        </span>
                    </div>

                    <div
                        className="attendance-progress"
                        role="progressbar"
                        aria-label="Overall attendance"
                        aria-valuenow={92}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div className="attendance-progress-fill"></div>
                    </div>

                    <div className="attendance-legend">
                        <div>
                            <span className="legend-dot present-dot"></span>
                            <span>Present</span>
                            <strong>478</strong>
                        </div>

                        <div>
                            <span className="legend-dot absent-dot"></span>
                            <span>Absent</span>
                            <strong>42</strong>
                        </div>
                    </div>
                </article>


                {/* Recent Activities */}
                <article className="dashboard-panel activity-panel">
                    <div className="panel-heading">
                        <div>
                            <h2>Recent Activities</h2>
                            <p>Latest school updates</p>
                        </div>

                        <Clock size={20} color="#647590" />
                    </div>

                    <div className="activity-list">
                        {activities.map((activity) => {
                            const ActivityIcon = activity.icon;

                            return (
                                <div
                                    className="activity-item"
                                    key={activity.title}
                                >
                                    <div
                                        className="activity-icon"
                                        style={{
                                            color: activity.color,
                                            backgroundColor: `${activity.color}18`,
                                        }}
                                    >
                                        <ActivityIcon size={19} />
                                    </div>

                                    <div className="activity-details">
                                        <h3>{activity.title}</h3>
                                        <p>{activity.detail}</p>
                                    </div>

                                    <span className="activity-time">
                                        {activity.time}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        className="activity-footer"
                        onClick={() =>
                            window.alert("Activity history will be added later.")
                        }
                    >
                        View all activities
                        <ArrowRight size={17} />
                    </button>
                </article>

            </section>
            <section className="quick-actions-section">
                <div className="quick-actions-header">
                    <div>
                        <h2>Quick Actions</h2>
                        <p>Quick access to common school activities</p>
                    </div>
                </div>

                <div className="quick-actions-grid">
                    {quickActions.map((action) => {
                        const ActionIcon = action.icon;

                        return (
                            <button
                                type="button"
                                className="quick-action-card"
                                key={action.title}
                            >
                                <div
                                    className="quick-action-icon"
                                    style={{
                                        color: action.color,
                                        backgroundColor: `${action.color}18`,
                                    }}
                                >
                                    <ActionIcon size={26} />
                                </div>

                                <span>{action.title}</span>

                                <ArrowRight size={16} />
                            </button>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default Dashboard;