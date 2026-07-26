// ── NoteSync mock data ─────────────────────────────────────────────────────

export interface Branch {
  slug: string;
  abbr: string;
  name: string;
  semesters: number;
  resources: number;
}

export interface University {
  slug: string;
  name: string;
  location: string;
  established: string;
  lastUpdated: string;
  branches: Branch[];
}

export interface Subject {
  slug: string;
  name: string;
  code: string;
  notes: number;
  pyqs: number;
  solutions: number;
}

export type ResourceType = "notes" | "pyq" | "solution" | "lab";

export interface Resource {
  id: string;
  title: string;
  uploader: string;
  size: string;
  year?: string;
  type: ResourceType;
  premium: boolean;
}

export interface SemesterData {
  [sem: number]: Subject[];
}

export interface BranchData {
  [branchSlug: string]: SemesterData;
}

// ── Universities ────────────────────────────────────────────────────────────

export const UNIVERSITIES: Record<string, University> = {
  kiit: {
    slug: "kiit",
    name: "KIIT University",
    location: "Bhubaneswar, Odisha",
    established: "1992",
    lastUpdated: "2025-07-12",
    branches: [
      { slug: "cse",   abbr: "CSE",   name: "Computer Science & Engineering",   semesters: 8, resources: 4218 },
      { slug: "ece",   abbr: "ECE",   name: "Electronics & Communication Engg",  semesters: 8, resources: 3102 },
      { slug: "mech",  abbr: "MECH",  name: "Mechanical Engineering",            semesters: 8, resources: 2891 },
      { slug: "civil", abbr: "CIVIL", name: "Civil Engineering",                 semesters: 8, resources: 1944 },
      { slug: "mba",   abbr: "MBA",   name: "Master of Business Administration", semesters: 6, resources: 892  },
      { slug: "it",    abbr: "IT",    name: "Information Technology",             semesters: 8, resources: 2341 },
    ],
  },

  "iit-delhi": {
    slug: "iit-delhi",
    name: "IIT Delhi",
    location: "New Delhi",
    established: "1961",
    lastUpdated: "2025-07-10",
    branches: [
      { slug: "cse",     abbr: "CSE",     name: "Computer Science & Engineering",  semesters: 8, resources: 3841 },
      { slug: "ece",     abbr: "ECE",     name: "Electrical Engineering",          semesters: 8, resources: 2910 },
      { slug: "mech",    abbr: "MECH",    name: "Mechanical Engineering",          semesters: 8, resources: 2540 },
      { slug: "civil",   abbr: "CIVIL",   name: "Civil Engineering",               semesters: 8, resources: 1820 },
      { slug: "chem",    abbr: "CHEM",    name: "Chemical Engineering",            semesters: 8, resources: 1440 },
      { slug: "physics", abbr: "PHY",     name: "Engineering Physics",             semesters: 8, resources: 1180 },
    ],
  },

  "vit-vellore": {
    slug: "vit-vellore",
    name: "VIT Vellore",
    location: "Vellore, Tamil Nadu",
    established: "1984",
    lastUpdated: "2025-07-11",
    branches: [
      { slug: "cse",    abbr: "CSE",    name: "Computer Science & Engineering",   semesters: 8, resources: 5102 },
      { slug: "ece",    abbr: "ECE",    name: "Electronics & Communication Engg", semesters: 8, resources: 3744 },
      { slug: "mech",   abbr: "MECH",   name: "Mechanical Engineering",           semesters: 8, resources: 2988 },
      { slug: "civil",  abbr: "CIVIL",  name: "Civil Engineering",                semesters: 8, resources: 2102 },
      { slug: "it",     abbr: "IT",     name: "Information Technology",            semesters: 8, resources: 2891 },
      { slug: "aids",   abbr: "AIDS",   name: "AI & Data Science",                semesters: 8, resources: 1644 },
      { slug: "mba",    abbr: "MBA",    name: "Master of Business Administration",semesters: 4, resources: 730  },
    ],
  },

  "nit-rourkela": {
    slug: "nit-rourkela",
    name: "NIT Rourkela",
    location: "Rourkela, Odisha",
    established: "1961",
    lastUpdated: "2025-07-09",
    branches: [
      { slug: "cse",   abbr: "CSE",   name: "Computer Science & Engineering",  semesters: 8, resources: 2904 },
      { slug: "ece",   abbr: "ECE",   name: "Electronics & Communication Engg", semesters: 8, resources: 2210 },
      { slug: "mech",  abbr: "MECH",  name: "Mechanical Engineering",           semesters: 8, resources: 2080 },
      { slug: "civil", abbr: "CIVIL", name: "Civil Engineering",                semesters: 8, resources: 1740 },
      { slug: "chem",  abbr: "CHEM",  name: "Chemical Engineering",             semesters: 8, resources: 1290 },
      { slug: "it",    abbr: "IT",    name: "Information Technology",            semesters: 8, resources: 1640 },
    ],
  },

  "bits-pilani": {
    slug: "bits-pilani",
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    established: "1964",
    lastUpdated: "2025-07-08",
    branches: [
      { slug: "cse",     abbr: "CSE",     name: "Computer Science",              semesters: 8, resources: 3419 },
      { slug: "ece",     abbr: "ECE",     name: "Electronics & Communication",   semesters: 8, resources: 2680 },
      { slug: "mech",    abbr: "MECH",    name: "Mechanical Engineering",        semesters: 8, resources: 2240 },
      { slug: "chem",    abbr: "CHEM",    name: "Chemical Engineering",          semesters: 8, resources: 1820 },
      { slug: "physics", abbr: "PHY",     name: "Physics",                       semesters: 8, resources: 1340 },
    ],
  },

  amity: {
    slug: "amity",
    name: "Amity University",
    location: "Noida, Uttar Pradesh",
    established: "2005",
    lastUpdated: "2025-07-07",
    branches: [
      { slug: "cse",   abbr: "CSE",   name: "Computer Science & Engineering",   semesters: 8, resources: 4607 },
      { slug: "ece",   abbr: "ECE",   name: "Electronics & Communication Engg", semesters: 8, resources: 3210 },
      { slug: "bba",   abbr: "BBA",   name: "Bachelor of Business Administration", semesters: 6, resources: 2140 },
      { slug: "mba",   abbr: "MBA",   name: "Master of Business Administration",semesters: 4, resources: 1890 },
      { slug: "law",   abbr: "LAW",   name: "Law",                              semesters: 10, resources: 1560 },
      { slug: "media", abbr: "MEDIA", name: "Mass Communication & Journalism",  semesters: 6, resources: 1020 },
    ],
  },

  srm: {
    slug: "srm",
    name: "SRM University",
    location: "Chennai, Tamil Nadu",
    established: "1985",
    lastUpdated: "2025-07-06",
    branches: [
      { slug: "cse",   abbr: "CSE",   name: "Computer Science & Engineering",   semesters: 8, resources: 3255 },
      { slug: "ece",   abbr: "ECE",   name: "Electronics & Communication Engg", semesters: 8, resources: 2488 },
      { slug: "mech",  abbr: "MECH",  name: "Mechanical Engineering",           semesters: 8, resources: 2140 },
      { slug: "civil", abbr: "CIVIL", name: "Civil Engineering",                semesters: 8, resources: 1740 },
      { slug: "it",    abbr: "IT",    name: "Information Technology",            semesters: 8, resources: 1892 },
      { slug: "btech-ai", abbr: "AI", name: "B.Tech AI & Machine Learning",     semesters: 8, resources: 1140 },
    ],
  },

  manipal: {
    slug: "manipal",
    name: "Manipal University",
    location: "Manipal, Karnataka",
    established: "1953",
    lastUpdated: "2025-07-05",
    branches: [
      { slug: "cse",   abbr: "CSE",   name: "Computer Science & Engineering",   semesters: 8, resources: 2881 },
      { slug: "ece",   abbr: "ECE",   name: "Electronics & Communication Engg", semesters: 8, resources: 2210 },
      { slug: "mech",  abbr: "MECH",  name: "Mechanical Engineering",           semesters: 8, resources: 1980 },
      { slug: "civil", abbr: "CIVIL", name: "Civil Engineering",                semesters: 8, resources: 1540 },
      { slug: "mbbs",  abbr: "MBBS",  name: "Bachelor of Medicine",             semesters: 10, resources: 2340 },
      { slug: "bpharm",abbr: "PHARM", name: "Bachelor of Pharmacy",             semesters: 8, resources: 1120 },
    ],
  },
};

// ── Subjects per branch / semester ──────────────────────────────────────────

export const BRANCH_SUBJECTS: BranchData = {
  cse: {
    1: [
      { slug: "mathematics-1",   name: "Mathematics I",              code: "CS101", notes: 4, pyqs: 6, solutions: 3 },
      { slug: "physics",         name: "Engineering Physics",         code: "CS102", notes: 3, pyqs: 5, solutions: 2 },
      { slug: "programming-c",   name: "Programming in C",           code: "CS103", notes: 5, pyqs: 7, solutions: 4 },
      { slug: "english-comm",    name: "English Communication",      code: "CS104", notes: 2, pyqs: 4, solutions: 1 },
    ],
    2: [
      { slug: "mathematics-2",   name: "Mathematics II",             code: "CS201", notes: 3, pyqs: 5, solutions: 2 },
      { slug: "data-structures", name: "Data Structures",            code: "CS202", notes: 4, pyqs: 7, solutions: 3 },
      { slug: "digital-logic",   name: "Digital Logic Design",       code: "CS203", notes: 3, pyqs: 6, solutions: 2 },
      { slug: "oop-java",        name: "Object Oriented Programming",code: "CS204", notes: 5, pyqs: 8, solutions: 4 },
    ],
    3: [
      { slug: "data-structures", name: "Data Structures",            code: "CS301", notes: 3, pyqs: 8, solutions: 5 },
      { slug: "os",              name: "Operating Systems",          code: "CS302", notes: 4, pyqs: 7, solutions: 3 },
      { slug: "dbms",            name: "Database Management Systems",code: "CS303", notes: 6, pyqs: 9, solutions: 4 },
      { slug: "cn",              name: "Computer Networks",          code: "CS304", notes: 2, pyqs: 6, solutions: 2 },
      { slug: "discrete-maths",  name: "Discrete Mathematics",       code: "CS305", notes: 5, pyqs: 4, solutions: 1 },
    ],
    4: [
      { slug: "algorithms",      name: "Design & Analysis of Algorithms", code: "CS401", notes: 4, pyqs: 7, solutions: 3 },
      { slug: "software-engg",   name: "Software Engineering",       code: "CS402", notes: 3, pyqs: 5, solutions: 2 },
      { slug: "theory-comp",     name: "Theory of Computation",      code: "CS403", notes: 2, pyqs: 6, solutions: 1 },
      { slug: "microprocessors", name: "Microprocessors",            code: "CS404", notes: 3, pyqs: 5, solutions: 2 },
    ],
    5: [
      { slug: "compiler-design", name: "Compiler Design",            code: "CS501", notes: 3, pyqs: 5, solutions: 2 },
      { slug: "ai",              name: "Artificial Intelligence",    code: "CS502", notes: 4, pyqs: 6, solutions: 3 },
      { slug: "computer-arch",   name: "Computer Architecture",      code: "CS503", notes: 2, pyqs: 4, solutions: 1 },
      { slug: "web-tech",        name: "Web Technologies",           code: "CS504", notes: 5, pyqs: 4, solutions: 3 },
    ],
    6: [
      { slug: "machine-learning",name: "Machine Learning",           code: "CS601", notes: 5, pyqs: 5, solutions: 3 },
      { slug: "cloud-computing", name: "Cloud Computing",            code: "CS602", notes: 3, pyqs: 4, solutions: 2 },
      { slug: "info-security",   name: "Information Security",       code: "CS603", notes: 4, pyqs: 6, solutions: 2 },
    ],
    7: [
      { slug: "deep-learning",   name: "Deep Learning",              code: "CS701", notes: 3, pyqs: 3, solutions: 2 },
      { slug: "distributed-sys", name: "Distributed Systems",        code: "CS702", notes: 2, pyqs: 3, solutions: 1 },
    ],
    8: [
      { slug: "capstone-project",name: "Capstone Project",           code: "CS801", notes: 1, pyqs: 0, solutions: 0 },
      { slug: "open-elective",   name: "Open Elective",              code: "CS802", notes: 2, pyqs: 3, solutions: 1 },
    ],
  },
  ece: {
    3: [
      { slug: "signals-systems",    name: "Signals & Systems",      code: "EC301", notes: 3, pyqs: 6, solutions: 2 },
      { slug: "analog-circuits",    name: "Analog Circuits",         code: "EC302", notes: 4, pyqs: 7, solutions: 3 },
      { slug: "electromagnetic",    name: "Electromagnetic Theory",  code: "EC303", notes: 2, pyqs: 5, solutions: 1 },
      { slug: "digital-comm",       name: "Digital Communication",   code: "EC304", notes: 3, pyqs: 5, solutions: 2 },
    ],
  },
};

// ── Resources per subject ────────────────────────────────────────────────────

export const SUBJECT_RESOURCES: Record<string, Resource[]> = {
  "data-structures": [
    { id: "ds-001", title: "Unit 1-3 Complete Notes",           uploader: "Arjun M.",  size: "4.2 MB", type: "notes",    premium: false },
    { id: "ds-002", title: "Unit 4-6 Notes with Diagrams",      uploader: "Priya N.",  size: "3.8 MB", type: "notes",    premium: false },
    { id: "ds-003", title: "PYQ 2023 with Solutions",           uploader: "",          size: "1.1 MB", year: "2023", type: "pyq",      premium: true  },
    { id: "ds-004", title: "PYQ 2022",                          uploader: "",          size: "0.9 MB", year: "2022", type: "pyq",      premium: true  },
    { id: "ds-005", title: "PYQ 2021",                          uploader: "",          size: "0.8 MB", year: "2021", type: "pyq",      premium: true  },
    { id: "ds-006", title: "Algorithm Analysis Solutions",       uploader: "",          size: "2.2 MB", type: "solution", premium: true  },
    { id: "ds-007", title: "Lab Manual Complete",               uploader: "Rohit S.",  size: "5.1 MB", type: "lab",      premium: false },
  ],
  os: [
    { id: "os-001", title: "Process Management Notes",          uploader: "Sneha P.",  size: "3.1 MB", type: "notes",    premium: false },
    { id: "os-002", title: "Memory Management & File Systems",  uploader: "Karan T.",  size: "4.4 MB", type: "notes",    premium: false },
    { id: "os-003", title: "Unit 5 — Deadlocks",               uploader: "Nisha R.",  size: "2.0 MB", type: "notes",    premium: false },
    { id: "os-004", title: "PYQ 2023",                          uploader: "",          size: "0.9 MB", year: "2023", type: "pyq",      premium: true  },
    { id: "os-005", title: "PYQ 2022",                          uploader: "",          size: "0.8 MB", year: "2022", type: "pyq",      premium: true  },
    { id: "os-006", title: "OS Solved Numericals 2023",         uploader: "",          size: "1.6 MB", type: "solution", premium: true  },
    { id: "os-007", title: "OS Lab Manual",                     uploader: "Dev K.",    size: "3.9 MB", type: "lab",      premium: false },
  ],
  dbms: [
    { id: "db-001", title: "ER Diagrams & Normalisation",       uploader: "Ananya S.", size: "2.8 MB", type: "notes",    premium: false },
    { id: "db-002", title: "SQL Complete Reference",            uploader: "Rahul V.",  size: "1.9 MB", type: "notes",    premium: false },
    { id: "db-003", title: "Transaction Management Notes",      uploader: "Mohan B.",  size: "3.2 MB", type: "notes",    premium: false },
    { id: "db-004", title: "Unit 5-6 Distributed DB",          uploader: "Priya N.",  size: "2.5 MB", type: "notes",    premium: false },
    { id: "db-005", title: "PYQ 2023 with Answers",            uploader: "",          size: "1.2 MB", year: "2023", type: "pyq",      premium: true  },
    { id: "db-006", title: "PYQ 2022",                          uploader: "",          size: "0.9 MB", year: "2022", type: "pyq",      premium: true  },
    { id: "db-007", title: "DBMS Solved Paper 2021",           uploader: "",          size: "1.0 MB", year: "2021", type: "pyq",      premium: true  },
    { id: "db-008", title: "Practicals & Lab Solutions",        uploader: "",          size: "2.6 MB", type: "solution", premium: true  },
    { id: "db-009", title: "DB Lab Manual",                     uploader: "Rohit S.",  size: "4.1 MB", type: "lab",      premium: false },
  ],
};

// ── Recently added ───────────────────────────────────────────────────────────

export interface RecentResource {
  title: string;
  branch: string;
  sem: number;
  subject: string;
  uploadedAt: string;
}

export const RECENT_RESOURCES: RecentResource[] = [
  { title: "DBMS PYQ 2024",                branch: "CSE", sem: 3, subject: "DBMS",             uploadedAt: "2h ago"  },
  { title: "OS Solved Paper 2023",         branch: "CSE", sem: 3, subject: "Operating Systems", uploadedAt: "5h ago"  },
  { title: "DSA Unit 5 Notes",             branch: "CSE", sem: 3, subject: "Data Structures",   uploadedAt: "1d ago"  },
  { title: "Analog Circuits Reference",    branch: "ECE", sem: 3, subject: "Analog Circuits",   uploadedAt: "2d ago"  },
  { title: "CN Lab Manual",               branch: "CSE", sem: 3, subject: "Computer Networks",  uploadedAt: "3d ago"  },
];

// ── University email domain registry ────────────────────────────────────────
// Maps known institutional email domains → university slug
// Used for auto-detection and validation during registration

export interface UniversityEmailRule {
  slug: string;
  name: string;
  domains: string[];           // exact domains accepted
  studentPattern?: RegExp;     // optional: validates the local-part format
  autoDetect: boolean;         // auto-select university from email
}

export const UNIVERSITY_EMAIL_RULES: UniversityEmailRule[] = [
  {
    slug: "kiit",
    name: "KIIT University",
    domains: ["kiit.ac.in", "kmail.kiit.ac.in"],
    studentPattern: /^\d{8}$/,   // 8-digit roll number
    autoDetect: true,
  },
  {
    slug: "iit-delhi",
    name: "IIT Delhi",
    domains: ["iitd.ac.in", "ee.iitd.ac.in", "cse.iitd.ac.in"],
    autoDetect: true,
  },
  {
    slug: "vit-vellore",
    name: "VIT Vellore",
    domains: ["vitstudent.ac.in", "vit.ac.in"],
    autoDetect: true,
  },
  {
    slug: "nit-rourkela",
    name: "NIT Rourkela",
    domains: ["nitrkl.ac.in"],
    studentPattern: /^\d{9}$/,   // 9-digit roll
    autoDetect: true,
  },
  {
    slug: "bits-pilani",
    name: "BITS Pilani",
    domains: ["pilani.bits-pilani.ac.in", "goa.bits-pilani.ac.in", "hyderabad.bits-pilani.ac.in"],
    autoDetect: true,
  },
  {
    slug: "amity",
    name: "Amity University",
    domains: ["s.amity.edu", "amity.edu"],
    autoDetect: true,
  },
  {
    slug: "srm",
    name: "SRM University",
    domains: ["srmist.edu.in", "srm.edu.in"],
    autoDetect: true,
  },
  {
    slug: "manipal",
    name: "Manipal University",
    domains: ["learner.manipal.edu", "manipal.edu"],
    autoDetect: true,
  },
];

/**
 * Detect university from email address.
 * Returns the matching rule or null if no match.
 */
export function detectUniversityFromEmail(email: string): UniversityEmailRule | null {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return null;
  return (
    UNIVERSITY_EMAIL_RULES.find((rule) =>
      rule.domains.some((d) => domain === d || domain.endsWith(`.${d}`))
    ) ?? null
  );
}

/**
 * Validate email against a specific university's rules.
 * Returns null if valid, or an error message string.
 */
export function validateUniversityEmail(
  email: string,
  universitySlug: string
): string | null {
  const rule = UNIVERSITY_EMAIL_RULES.find((r) => r.slug === universitySlug);
  if (!rule) return null; // Unknown university — no validation enforced

  const [localPart, domain] = email.toLowerCase().split("@");
  if (!domain) return "Invalid email address.";

  const domainMatch = rule.domains.some(
    (d) => domain === d || domain.endsWith(`.${d}`)
  );
  if (!domainMatch) {
    return `Use your ${rule.name} institutional email (e.g. @${rule.domains[0]}).`;
  }

  if (rule.studentPattern && !rule.studentPattern.test(localPart)) {
    return `Email format not recognised for ${rule.name} students.`;
  }

  return null;
}
