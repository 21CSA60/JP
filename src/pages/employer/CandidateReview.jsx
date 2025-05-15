import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Star,
  Clock,
  AlertCircle,
  MessageSquare,
  Briefcase,
  GraduationCap,
} from "lucide-react"

const CandidateReview = () => {
  const { applicationId } = useParams()
  const navigate = useNavigate()
  const { getApplicationById, updateApplicationStatus } = useJob()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notes, setNotes] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    loadApplication()
  }, [applicationId])

  const loadApplication = async () => {
    try {
      setLoading(true)
      const data = await getApplicationById(applicationId)
      setApplication(data)
    } catch (err) {
      setError("Failed to load application details")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (status) => {
    try {
      setIsUpdating(true)
      await updateApplicationStatus(applicationId, status)
      setApplication(prev => ({ ...prev, status }))
      // Show success message
    } catch (err) {
      setError("Failed to update application status")
    } finally {
      setIsUpdating(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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

  if (error || !application) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 font-medium mb-2">{error || "Application not found"}</p>
          <Link
            to="/employer/applications"
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Applications
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Candidate Application Review
              </h2>
              <p className="text-sm text-gray-600">
                Applied on {formatDate(application.appliedAt)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                application.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : application.status === "shortlisted"
                  ? "bg-blue-100 text-blue-800"
                  : application.status === "accepted"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Candidate Information */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-gray-400" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <p className="flex items-center text-gray-600">
                  <span className="font-medium w-32">Full Name:</span>
                  {application.candidate.name}
                </p>
                <p className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {application.candidate.email}
                </p>
                <p className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {application.candidate.phone}
                </p>
                <p className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {application.candidate.address}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                Professional Information
              </h3>
              <div className="space-y-3">
                <p className="flex items-center text-gray-600">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <span className="font-medium">Education:</span>
                  <span className="ml-2">{application.candidate.education}</span>
                </p>
                <p className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span className="font-medium">Experience:</span>
                  <span className="ml-2">{application.candidate.experience}</span>
                </p>
                {application.candidate.skills && typeof application.candidate.skills === 'string' && (
                  <div className="flex items-start text-gray-600">
                    <FileText className="h-4 w-4 mr-2 mt-1" />
                    <div>
                      <span className="font-medium">Skills:</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {application.candidate.skills.split(",").map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Application Details */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Application Details</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Letter</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 whitespace-pre-wrap">{application.coverLetter}</p>
                </div>
              </div>

              {application.answers && application.answers.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Screening Questions</h4>
                  <div className="space-y-4">
                    {application.job.questions.map((question, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">{question}</p>
                        <p className="text-gray-600">{application.answers[index]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <a
                    href={application.resumeUrl}
                    download
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hiring Manager Notes */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-gray-400" />
              Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Add notes about the candidate..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            <div className="flex space-x-4">
              {application.status === "pending" && (
                <>
                  <button
                    onClick={() => handleStatusUpdate("shortlisted")}
                    disabled={isUpdating}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Shortlist
                  </button>
                  <button
                    onClick={() => handleUpdateStatus("rejected")}
                    disabled={isUpdating}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </button>
                </>
              )}
              {application.status === "shortlisted" && (
                <button
                  onClick={() => handleStatusUpdate("accepted")}
                  disabled={isUpdating}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CandidateReview