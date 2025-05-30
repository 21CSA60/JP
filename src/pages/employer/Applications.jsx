import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { Download, Mail, Phone, MapPin, Briefcase, Star, Users, CheckCircle, XCircle, Clock } from "lucide-react"
import Pagination from "../../components/common/Pagination"

const Applications = () => {
  const { jobId } = useParams()
  const { getJobById, getApplicationsByJob, updateApplicationStatus } = useJob()
  const [job, setJob] = useState(null)
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const applicationsPerPage = 10
  const totalPages = Math.ceil(applications.length / applicationsPerPage)

  useEffect(() => {
    loadData()
  }, [jobId])

  const loadData = async () => {
    setIsLoading(true)
    try {
      if (jobId) {
        const jobData = await getJobById(jobId)
        const applicationsData = await getApplicationsByJob(jobId)
        setJob(jobData)
        setApplications(applicationsData)
      } else {
        // Load all applications across all jobs
        const allJobs = await getJobById()
        if (Array.isArray(allJobs) && allJobs.length > 0) {
          const allApplicationsPromises = allJobs.map(async job => {
            const jobApplications = await getApplicationsByJob(job.id)
            return jobApplications.map(app => ({
              ...app,
              job
            }))
          })
          const allApplicationsArrays = await Promise.all(allApplicationsPromises)
          const allApplications = allApplicationsArrays.flat()
          setApplications(allApplications)
        } else {
          setApplications([])
        }
      }
    } catch (error) {
      console.error("Failed to load data:", error)
      setApplications([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus)
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      )
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const filteredApplications = applications
    .filter(app => filter === "all" || app.status.toLowerCase() === filter)
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.appliedAt) - new Date(a.appliedAt)
      }
      return 0
    })

  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * applicationsPerPage,
    currentPage * applicationsPerPage
  )

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "shortlisted":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {job ? `Applications for ${job.title}` : "All Applications"}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  {applications.length} total applications
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex flex-wrap gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading applications...</p>
            </div>
          ) : paginatedApplications.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
              <p className="mt-1 text-sm text-gray-500">
                No applications match your current filters
              </p>
            </div>
          ) : (
            paginatedApplications.map((application) => (
              <div
                key={application.id}
                className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {application.candidate.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getStatusBadgeColor(application.status)
                        }`}>
                          {application.status}
                        </span>
                      </div>
                      {!jobId && (
                        <p className="text-sm text-gray-600">
                          Applied for: {application.job.title}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {application.candidate.email}
                        </span>
                        {application.candidate.phone && (
                          <span className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {application.candidate.phone}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Applied {formatDate(application.appliedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/employer/review/${application.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Review Application
                      </Link>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-4 flex items-center space-x-4">
                    {application.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(application.id, "shortlisted")}
                          className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Shortlist
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(application.id, "rejected")}
                          className="flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </button>
                      </>
                    )}
                    {application.status === "shortlisted" && (
                      <button
                        onClick={() => handleUpdateStatus(application.id, "accepted")}
                        className="flex items-center px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-md"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!isLoading && applications.length > applicationsPerPage && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Applications