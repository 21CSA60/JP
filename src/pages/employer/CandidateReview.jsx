"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { User, Briefcase, CheckCircle, XCircle, ExternalLink, AlertCircle, Mail, Phone } from "lucide-react"
import DashboardLayout from "../../components/dashboard/DashboardLayout"

const CandidateReview = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { getApplicationsByJob, getJobById, updateApplicationStatus } = useJob()
  const [applications, setApplications] = useState([])
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const jobData = await getJobById(jobId)
        const applicationsData = await getApplicationsByJob(jobId)
        setJob(jobData)
        setApplications(applicationsData)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [jobId])
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      setError(null)
      await updateApplicationStatus(applicationId, status)
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status } : app
        )
      )
      // Show success message or toast notification
    } catch (error) {
      setError("Failed to update application status. Please try again.")
      console.error("Failed to update status:", error)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!job) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 font-medium mb-2">Job details not found.</p>
          <Link to="/employer/manage-jobs" className="text-blue-600 hover:text-blue-700">
            Go back to manage jobs
          </Link>
        </div>
      </DashboardLayout>
    )
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Review Candidates for {job.title}</h2>
            <p className="text-sm text-gray-600 mt-1">Review and manage applications for this position</p>
          </div>
          
          <div className="p-6">
            {applications.length === 0 ? (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-900 font-medium">No applications yet</p>
                <p className="text-gray-500 text-sm">There are no applications to review at this time</p>
              </div>
            ) : (
              <div className="space-y-6">
                {applications.map((application) => (
                  <div key={application.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{application.candidate.name}</h3>
                        <div className="space-y-1">
                          <p className="flex items-center text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {application.candidate.email}
                          </p>
                          <p className="flex items-center text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            {application.candidate.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'accepted')}
                          className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'rejected')}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Application Details</h4>
                      {application.answers && (
                        <div className="space-y-2">
                          {job.questions?.map((question, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded">
                              <p className="text-sm font-medium text-gray-700">{question}</p>
                              <p className="mt-1 text-gray-600">{application.answers[index]}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {application.resumeUrl && (
                      <div className="mt-4 flex justify-end">
                        <a
                          href={application.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Resume
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CandidateReview