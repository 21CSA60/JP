"use client"

import { createContext, useContext, useState } from "react";
import { jobs as mockJobs, applications as mockApplications } from "../data/mockData";

const JobContext = createContext();

export function useJob() {
  return useContext(JobContext);
}

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    console.log('Initial mockJobs:', mockJobs);
    return mockJobs || [];
  });
  const [applications, setApplications] = useState(() => {
    console.log('Initial mockApplications:', mockApplications);
    return mockApplications || [];
  });

  const getJobs = () => jobs;

  const getJobById = (id) => jobs.find(job => job.id === id);

  const getJobsByEmployer = (employerId) => 
    jobs.filter(job => job.employerId === employerId);

  const addJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: `job${jobs.length + 1}`,
      employerId: "emp1", // Since we're using the demo employer
      employerName: "Tech Solutions Inc.",
      createdAt: new Date().toISOString(),
      status: "active"
    };
    setJobs([...jobs, jobWithId]);
    return Promise.resolve(jobWithId);
  };

  const updateJob = (id, updatedJob) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, ...updatedJob, updatedAt: new Date().toISOString() } : job
    ));
    return Promise.resolve();
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const getApplicationsByJob = (jobId) => {
    return applications.filter(app => app.jobId === jobId);
  };

  const getApplicationsByCandidate = (candidateId) => {
    return applications.filter(app => app.candidateId === candidateId);
  };

  const getApplicationById = (id) => {
    return applications.find(app => app.id === id);
  };

  const updateApplicationStatus = (applicationId, status) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ));
    return Promise.resolve();
  };

  const applyToJob = (jobId, candidateData) => {
    const newApplication = {
      id: `app${applications.length + 1}`,
      jobId,
      candidateId: candidateData.id,
      status: "pending",
      appliedAt: new Date().toISOString(),
      candidate: candidateData,
      coverLetter: candidateData.coverLetter,
      resumeUrl: candidateData.resumeUrl,
      answers: candidateData.answers
    };
    setApplications([...applications, newApplication]);
    return Promise.resolve(newApplication);
  };

  const withdrawApplication = (applicationId) => {
    setApplications(applications.filter(app => app.id !== applicationId));
    return Promise.resolve();
  };

  const value = {
    jobs,
    applications,
    getJobs,
    getJobById,
    getJobsByEmployer,
    addJob,
    updateJob,
    deleteJob,
    getApplicationsByJob,
    getApplicationsByCandidate,
    getApplicationById,
    updateApplicationStatus,
    applyToJob,
    withdrawApplication
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
}