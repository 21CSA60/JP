// Mock Jobs
export const jobs = [
  {
    id: "job1",
    employerId: "emp1",
    employerName: "Tech Solutions Inc.",
    title: "Senior Full Stack Developer",
    description: "Looking for an experienced full-stack developer to join our team",
    responsibilities: "- Develop and maintain web applications\n- Work with cross-functional teams\n- Code review and mentoring",
    requirements: ["5+ years of experience", "Strong JavaScript skills", "Experience with React and Node.js"],
    specializations: "Web Development, JavaScript, React",
    jobType: "Full-time",
    salaryRange: "$120,000 - $160,000",
    careerLevel: "Senior Level",
    experienceYears: "5+ years",
    qualification: "Bachelor's Degree",
    industry: "Technology",
    location: "San Francisco, CA",
    deadline: "2024-03-30",
    createdAt: "2024-01-15",
    status: "active",
    questions: [
      "What's your experience with React?",
      "Describe a challenging project you worked on"
    ]
  },
  {
    id: "job2",
    employerId: "emp1",
    employerName: "Tech Solutions Inc.",
    title: "Healthcare Data Analyst",
    description: "Seeking a data analyst to work with healthcare data",
    responsibilities: "- Analyze healthcare data\n- Create reports\n- Work with stakeholders",
    requirements: ["3+ years of experience", "Strong SQL skills", "Healthcare background preferred"],
    specializations: "Data Analysis, Healthcare",
    jobType: "Full-time",
    salaryRange: "$80,000 - $100,000",
    careerLevel: "Mid Level",
    experienceYears: "3+ years",
    qualification: "Bachelor's Degree",
    industry: "Healthcare",
    location: "Boston, MA",
    deadline: "2024-03-15",
    createdAt: "2024-01-10",
    status: "active",
    questions: [
      "Do you have experience with healthcare data?",
      "What data analysis tools do you use?"
    ]
  }
];

// Mock Applications
export const applications = [
  {
    id: "app1",
    jobId: "job1",
    candidateId: "cand1",
    status: "shortlisted",
    appliedAt: "2024-01-16",
    coverLetter: "I am interested in the Senior Full Stack Developer position...",
    resumeUrl: "https://example.com/resumes/john-smith.pdf",
    answers: [
      "8 years of experience with React in production environments",
      "Led a team of 5 developers in building a high-traffic e-commerce platform"
    ],
    candidate: {
      id: "cand1",
      name: "John Smith",
      email: "john.smith@example.com",
      title: "Senior Software Engineer",
      phone: "+1 234-567-8901",
      location: "San Francisco, CA",
      bio: "Experienced software engineer with 8+ years in full-stack development",
      education: "M.S. Computer Science, Stanford University\nB.S. Computer Science, UC Berkeley",
      experience: "Senior Software Engineer at Tech Corp (2018-Present)\nSoftware Engineer at StartupCo (2015-2018)",
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
      website: "https://johnsmith.dev",
      linkedin: "https://linkedin.com/in/johnsmith",
      github: "https://github.com/johnsmith",
    }
  },
  {
    id: "app2",
    jobId: "job2",
    candidateId: "cand2",
    status: "pending",
    appliedAt: "2024-01-12",
    coverLetter: "With my background in data science and healthcare analytics...",
    resumeUrl: "https://example.com/resumes/sarah-johnson.pdf",
    answers: [
      "3 years experience analyzing healthcare datasets",
      "Proficient in Python, R, and SQL for data analysis"
    ],
    candidate: {
      id: "cand2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      title: "Data Scientist",
      phone: "+1 234-567-8902",
      location: "Boston, MA",
      bio: "Data scientist specializing in healthcare analytics",
      education: "Ph.D. Biostatistics, Harvard University\nM.S. Statistics, UCLA",
      experience: "Data Scientist at Health Analytics (2020-Present)\nBiostatistician at Research Lab (2018-2020)",
      skills: ["Python", "R", "SQL", "Machine Learning", "Healthcare Analytics"],
      linkedin: "https://linkedin.com/in/sarahjohnson",
      github: "https://github.com/sarahjohnson",
    }
  }
];

// Resume Alerts
export const resumeAlerts = [
  {
    id: "alert1",
    employerId: "emp1",
    title: "Senior Developer Alert",
    jobTitle: "Senior Full Stack Developer",
    skills: "React, Node.js, TypeScript",
    experienceLevel: "Senior Level",
    education: "Bachelor's Degree",
    location: "San Francisco, CA",
    salary: "$120k-$160k",
    frequency: "Daily",
    matchedCandidates: ["cand1", "cand3"]
  },
  {
    id: "alert2",
    employerId: "emp1",
    title: "Data Scientist Alert",
    jobTitle: "Healthcare Data Analyst",
    skills: "Python, R, SQL, Healthcare Analytics",
    experienceLevel: "Mid Level",
    education: "Master's Degree",
    location: "Boston, MA",
    salary: "$80k-$100k",
    frequency: "Weekly",
    matchedCandidates: ["cand2"]
  }
];

// Mock Candidates
export const candidates = [
  {
    id: "cand1",
    name: "John Smith",
    email: "john.smith@example.com",
    title: "Senior Software Engineer",
    phone: "+1 234-567-8901",
    location: "San Francisco, CA",
    bio: "Experienced software engineer with 8+ years in full-stack development",
    education: "M.S. Computer Science, Stanford University\nB.S. Computer Science, UC Berkeley",
    experience: "Senior Software Engineer at Tech Corp (2018-Present)\nSoftware Engineer at StartupCo (2015-2018)",
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
    website: "https://johnsmith.dev",
    linkedin: "https://linkedin.com/in/johnsmith",
    github: "https://github.com/johnsmith",
    resumeUrl: "https://example.com/resumes/john-smith.pdf",
    isPublic: true,
  },
  {
    id: "cand2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    title: "Data Scientist",
    phone: "+1 234-567-8902",
    location: "Boston, MA",
    bio: "Data scientist specializing in healthcare analytics",
    education: "Ph.D. Biostatistics, Harvard University\nM.S. Statistics, UCLA",
    experience: "Data Scientist at Health Analytics (2020-Present)\nBiostatistician at Research Lab (2018-2020)",
    skills: ["Python", "R", "SQL", "Machine Learning", "Healthcare Analytics"],
    linkedin: "https://linkedin.com/in/sarahjohnson",
    github: "https://github.com/sarahjohnson",
    resumeUrl: "https://example.com/resumes/sarah-johnson.pdf",
    isPublic: true,
  },
  {
    id: "cand3",
    name: "Michael Chen",
    email: "michael.c@example.com",
    title: "Full Stack Developer",
    phone: "+1 234-567-8903",
    location: "San Francisco, CA",
    bio: "Full stack developer with strong focus on modern web technologies",
    education: "B.S. Computer Science, MIT",
    experience: "Full Stack Developer at WebTech (2019-Present)\nJunior Developer at StartupX (2017-2019)",
    skills: ["TypeScript", "React", "Node.js", "GraphQL", "AWS"],
    linkedin: "https://linkedin.com/in/michaelchen",
    github: "https://github.com/michaelchen",
    resumeUrl: "https://example.com/resumes/michael-chen.pdf",
    isPublic: true,
  }
];