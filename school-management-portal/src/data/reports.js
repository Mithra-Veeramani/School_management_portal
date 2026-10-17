const attendanceReport = [
  {
    id: 1,
    className: "Class 6",
    totalStudents: 58,
    present: 52,
    absent: 6,
    attendance: "89.7%",
  },
  {
    id: 2,
    className: "Class 7",
    totalStudents: 55,
    present: 48,
    absent: 7,
    attendance: "87.3%",
  },
  {
    id: 3,
    className: "Class 8",
    totalStudents: 60,
    present: 50,
    absent: 10,
    attendance: "83.3%",
  },
  {
    id: 4,
    className: "Class 9",
    totalStudents: 52,
    present: 45,
    absent: 7,
    attendance: "86.5%",
  },
  {
    id: 5,
    className: "Class 10",
    totalStudents: 50,
    present: 43,
    absent: 7,
    attendance: "86.0%",
  },
];

const attendanceChart = [
  {
    className: "Class 6",
    present: 80,
    absent: 20,
  },
  {
    className: "Class 7",
    present: 71,
    absent: 19,
  },
  {
    className: "Class 8",
    present: 85,
    absent: 19,
  },
  {
    className: "Class 9",
    present: 71,
    absent: 20,
  },
  {
    className: "Class 10",
    present: 71,
    absent: 20,
  },
  {
    className: "Class 11",
    present: 71,
    absent: 20,
  },
  {
    className: "Class 12",
    present: 71,
    absent: 23,
  },
];

const assignmentReport = [
  {
    id: 1,
    subject: "Mathematics",
    total: 5,
    completed: 4,
    pending: 1,
    completion: "80%",
  },
  {
    id: 2,
    subject: "Science",
    total: 4,
    completed: 3,
    pending: 1,
    completion: "75%",
  },
  {
    id: 3,
    subject: "English",
    total: 3,
    completed: 3,
    pending: 0,
    completion: "100%",
  },
  {
    id: 4,
    subject: "Social Science",
    total: 4,
    completed: 2,
    pending: 2,
    completion: "50%",
  },
  {
    id: 5,
    subject: "Computer Science",
    total: 4,
    completed: 3,
    pending: 1,
    completion: "75%",
  },
];

const reportsSummary = {
  totalStudents: 320,
  totalTeachers: 24,
  totalClasses: 12,
  totalAssignments: 24,
  completedAssignments: 16,
  pendingAssignments: 6,
};

export {
  attendanceReport,
  attendanceChart,
  assignmentReport,
  reportsSummary,
};