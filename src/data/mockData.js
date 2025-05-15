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
    shortlistedAt: "2024-01-17",
    coverLetter: "I am interested in the Senior Full Stack Developer position...",
    resumeUrl: "https://example.com/resumes/john-smith.pdf",
    answers: [
      "8 years of experience with React in production environments",
      "Led a team of 5 developers in building a high-traffic e-commerce platform"
    ],
    candidate: {
      id: "cand1",
      name: "John Smith",
      email: "john.s@example.com",
      title: "Senior Software Engineer",
      phone: "+1 234-567-8901",
      location: "San Francisco, CA",
      photo: null,
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
      education: "M.S. Computer Science, Stanford University",
      experience: "8 years",
      bio: "Experienced software engineer with 8+ years in full-stack development"
    }
  },
  {
    id: "app2",
    jobId: "job2",
    candidateId: "cand2",
    status: "shortlisted",
    appliedAt: "2024-01-12",
    shortlistedAt: "2024-01-14",
    coverLetter: "With my background in healthcare analytics...",
    resumeUrl: "https://example.com/resumes/sarah-jones.pdf",
    answers: [
      "5 years experience in healthcare data analysis",
      "Proficient in SQL, Python, and Tableau"
    ],
    candidate: {
      id: "cand2",
      name: "Sarah Jones",
      email: "sarah.j@example.com",
      title: "Healthcare Data Analyst",
      phone: "+1 234-567-8902",
      location: "Boston, MA",
      photo: null,
      skills: ["SQL", "Python", "Tableau", "Healthcare Analytics"],
      education: "B.S. Statistics, MIT",
      experience: "5 years",
      bio: "Data analyst specializing in healthcare analytics"
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
    skills: "React, Node.js, JavaScript",
    experienceLevel: "Senior Level",
    education: "Bachelor's Degree",
    location: "San Francisco, CA",
    salary: "$120k-$160k",
    frequency: "Daily",
    createdAt: "2024-01-15",
    matchedCandidates: ["cand1"]
  },
  {
    id: "alert2",
    employerId: "emp1",
    title: "Healthcare Analyst Alert",
    jobTitle: "Healthcare Data Analyst",
    skills: "SQL, Python, Healthcare Analytics",
    experienceLevel: "Mid Level",
    education: "Bachelor's Degree",
    location: "Boston, MA",
    salary: "$80k-$100k",
    frequency: "Weekly",
    createdAt: "2024-01-10",
    matchedCandidates: ["cand2"]
  }
];