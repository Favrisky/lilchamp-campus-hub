export const availableCourses = [
  { code: "CSC301", title: "Data Structures & Algorithms", units: 3, lecturer: "Prof. A. Bello", schedule: "Mon 10:00 - 12:00" },
  { code: "CSC305", title: "Operating Systems", units: 3, lecturer: "Dr. F. Ibrahim", schedule: "Tue 14:00 - 16:00" },
  { code: "CSC311", title: "Database Management Systems", units: 3, lecturer: "Dr. M. Eze", schedule: "Wed 08:00 - 10:00" },
  { code: "CSC313", title: "Software Engineering", units: 2, lecturer: "Prof. O. Adewale", schedule: "Wed 12:00 - 14:00" },
  { code: "CSC321", title: "Computer Architecture", units: 3, lecturer: "Dr. K. Yusuf", schedule: "Thu 10:00 - 12:00" },
  { code: "MTH301", title: "Linear Algebra II", units: 3, lecturer: "Prof. C. Nwosu", schedule: "Fri 08:00 - 10:00" },
  { code: "GST301", title: "Entrepreneurship Studies", units: 2, lecturer: "Mrs. T. Okafor", schedule: "Fri 12:00 - 14:00" },
  { code: "CSC399", title: "SIWES (Industrial Training)", units: 6, lecturer: "Coordinator", schedule: "Long Vacation" },
];

export type Result = {
  code: string;
  title: string;
  units: number;
  ca: number;
  exam: number;
  total: number;
  grade: string;
  point: number;
};

export const semesters = [
  {
    name: "2023/2024 — First Semester",
    gpa: 4.32,
    results: [
      { code: "CSC201", title: "Computer Programming II", units: 3, ca: 28, exam: 58, total: 86, grade: "A", point: 5 },
      { code: "CSC203", title: "Discrete Structures", units: 3, ca: 25, exam: 50, total: 75, grade: "A", point: 5 },
      { code: "CSC205", title: "Digital Logic Design", units: 2, ca: 22, exam: 45, total: 67, grade: "B", point: 4 },
      { code: "MTH201", title: "Mathematical Methods I", units: 3, ca: 20, exam: 42, total: 62, grade: "B", point: 4 },
      { code: "GST201", title: "Nigerian Peoples & Culture", units: 2, ca: 27, exam: 55, total: 82, grade: "A", point: 5 },
    ] satisfies Result[],
  },
  {
    name: "2023/2024 — Second Semester",
    gpa: 4.18,
    results: [
      { code: "CSC202", title: "Object Oriented Programming", units: 3, ca: 26, exam: 56, total: 82, grade: "A", point: 5 },
      { code: "CSC206", title: "System Analysis & Design", units: 2, ca: 21, exam: 44, total: 65, grade: "B", point: 4 },
      { code: "CSC208", title: "Web Development Fundamentals", units: 3, ca: 28, exam: 60, total: 88, grade: "A", point: 5 },
      { code: "MTH202", title: "Mathematical Methods II", units: 3, ca: 18, exam: 40, total: 58, grade: "C", point: 3 },
      { code: "GST202", title: "Communication in English", units: 2, ca: 25, exam: 50, total: 75, grade: "A", point: 5 },
    ] satisfies Result[],
  },
];

export const fees = [
  { id: "f1", title: "Tuition Fee", semester: "2024/2025 First Semester", amount: 250000, status: "Pending", due: "2025-01-15" },
  { id: "f2", title: "Accommodation (Hostel B)", semester: "2024/2025", amount: 85000, status: "Pending", due: "2025-01-20" },
  { id: "f3", title: "Departmental Levy", semester: "2024/2025", amount: 15000, status: "Paid", due: "2024-10-10" },
  { id: "f4", title: "ICT & Library Fee", semester: "2024/2025", amount: 20000, status: "Paid", due: "2024-10-10" },
  { id: "f5", title: "SUG & Sports Levy", semester: "2024/2025", amount: 5000, status: "Paid", due: "2024-10-10" },
];

export const announcements = [
  { date: "Nov 12", title: "Mid-semester examination timetable released", body: "Check your portal for the full schedule." },
  { date: "Nov 08", title: "Founder's Day public lecture", body: "All 300L students are required to attend." },
  { date: "Oct 30", title: "Library extended hours during exams", body: "Open until 11pm Mon-Sat." },
];
