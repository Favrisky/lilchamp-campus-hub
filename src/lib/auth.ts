export type Student = {
  id: string;
  matric: string;
  name: string;
  email: string;
  faculty: string;
  department: string;
  level: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
  state: string;
  avatar?: string;
};

const KEY = "lcu_auth";

export const defaultStudent: Student = {
  id: "stu_001",
  matric: "LCU/CSC/2022/0451",
  name: "Adebola Okonkwo",
  email: "adebola.okonkwo@lilchamp.edu.ng",
  faculty: "Science",
  department: "Computer Science",
  level: "300L",
  phone: "+234 803 555 0142",
  address: "12 Awolowo Way, Ikeja, Lagos",
  dob: "2003-04-18",
  gender: "Female",
  state: "Lagos",
};

export function getStudent(): Student | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function login(matric: string, _password: string): Student {
  const student = { ...defaultStudent, matric: matric || defaultStudent.matric };
  localStorage.setItem(KEY, JSON.stringify(student));
  return student;
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function updateStudent(patch: Partial<Student>): Student {
  const cur = getStudent() ?? defaultStudent;
  const next = { ...cur, ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
